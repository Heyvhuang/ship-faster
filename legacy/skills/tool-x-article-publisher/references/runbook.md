# X Article Publisher Runbook

This is the detailed runbook for `tool-x-article-publisher`.

`SKILL.md` is intentionally short (triggering + safety + I/O). Load this file only when you need step-by-step execution details.

## Preconditions

- Browser automation available (Playwright MCP or equivalent)
- The user is already logged into X (Twitter) and has access to Articles (Premium / Premium Plus)
- macOS strongly recommended (clipboard helper uses Cocoa)
- Python 3.9+ available locally

Python deps (macOS clipboard + image handling):

```bash
pip install Pillow pyobjc-framework-Cocoa
```

## Strategy: “Text First, Images Later”

For articles with multiple images, the reliable workflow is:

1) Paste all text content as rich text (from HTML) first  
2) Insert images at the correct locations using `block_index`

This avoids flaky “find text then insert image” behavior and makes positioning deterministic.

## Step 0: Prepare local artifacts (do this before opening the browser)

### Parse Markdown → structured JSON (title + images + block_index)

```bash
python ~/.claude/skills/tool-x-article-publisher/scripts/parse_markdown.py /path/to/article.md > /tmp/x_article.json
```

### Generate HTML-only body for rich text paste

```bash
python ~/.claude/skills/tool-x-article-publisher/scripts/parse_markdown.py /path/to/article.md --html-only > /tmp/x_article.html
```

Expected JSON fields:

- `title`: article title (from the first H1)
- `cover_image`: first image path (used as cover)
- `content_images[]`: each item has:
  - `path`
  - `block_index` (0-indexed)
  - `after_text` (debugging context only)

## Step 1: Open X Articles editor and create a new draft

Navigate:

```
https://x.com/compose/articles
```

Important behavior:

- The page initially shows a drafts list.
- The editor UI (“Add title”, editor body) often appears only after clicking the “Create” button.
- Do **not** wait for “Add title” before clicking create (it can deadlock your automation).

## Step 2: Upload cover image (first image)

Rules:

- **First image = cover** (use `cover_image` from the JSON).
- Cover upload typically uses the dedicated “Add photo or video” button and file upload flow.

## Step 3: Fill title

- Find the title textbox (usually “Add title”)
- Type `title` from the parsed JSON

## Step 4: Paste the article body (rich text)

Copy HTML to clipboard:

```bash
python ~/.claude/skills/tool-x-article-publisher/scripts/copy_to_clipboard.py html --file /tmp/x_article.html
```

Then in the editor body:

- Click into the body editor
- Paste: `Cmd+V` (macOS) / `Meta+V`

This preserves rich formatting (headers, lists, links, bold).

## Step 5: Insert content images (by block_index)

### Positioning principle

After pasting HTML, the editor content becomes a sequence of “blocks” (paragraphs, headers, quotes, lists).

Each `content_images[i].block_index` means:

- Insert the image **after** the block at that index (0-indexed).

### Insert in descending order

After inserting an image, the editor inserts a new block and shifts subsequent indices.

So insert images from the largest `block_index` → smallest `block_index`:

1) Sort `content_images` by `block_index` descending
2) For each image:
   - Click the target block
   - Paste the image (clipboard)
   - Wait for upload indicator to disappear (if present)

### Copy image → clipboard → paste

```bash
python ~/.claude/skills/tool-x-article-publisher/scripts/copy_to_clipboard.py image /path/to/img.jpg --quality 85
```

Then:

- Click the block at `block_index`
- Paste: `Cmd+V`

Upload waiting:

- Prefer “wait until textGone=Uploading media” with a short max wait (polling) instead of fixed sleep.

## Step 6: Verify + save as draft

Hard rule:

- **Never auto-publish**. Only save as draft and ask the user to review + publish manually.

Suggested checks:

- Open Preview, verify formatting
- Check images are in correct order and locations
- Confirm draft is saved

## Supported formatting notes

- H2 headers (`##`) supported
- Blockquotes (`>`) supported
- Lists supported
- Links supported
- Code blocks: converted into blockquote-like presentation (X Articles does not reliably support `<pre><code>`)

## Automation efficiency notes (for agents)

- Don’t “snapshot after every click” if your tool already returns updated state.
- Use waits only when needed (image upload / navigation).
- Do all local parsing + HTML generation before starting browser automation.
