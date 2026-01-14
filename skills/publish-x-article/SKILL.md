---
name: publish-x-article
description: Publish Markdown articles to X (Twitter) Articles editor with proper formatting. Use when user wants to publish a Markdown file/URL to X Articles, or mentions "publish to X", "post article to Twitter", "X article", or wants help with X Premium article publishing. Handles cover image upload and converts Markdown to rich text automatically.
---

# X Article Publisher

Publish Markdown content to X (Twitter) Articles editor, preserving formatting with rich text conversion.

## Prerequisites

- Playwright MCP for browser automation
- User logged into X with Premium Plus subscription
- Python 3.9+ with dependencies: `pip install Pillow pyobjc-framework-Cocoa`

## Scripts

Located in `~/.claude/skills/publish-x-article/scripts/`:

### parse_markdown.py
Parse Markdown and extract structured data:
```bash
python parse_markdown.py <markdown_file> [--output json|html] [--html-only]
```
Returns JSON with: title, cover_image, content_images (with block_index for positioning), html, total_blocks

### copy_to_clipboard.py
Copy image or HTML to system clipboard:
```bash
# Copy image (with optional compression)
python copy_to_clipboard.py image /path/to/image.jpg [--quality 80]

# Copy HTML for rich text paste
python copy_to_clipboard.py html --file /path/to/content.html
```

## Workflow

**Strategy: "Text First, Images Later"**

For articles with multiple images, paste ALL text content first, then insert images at correct positions using block index.

1. Parse Markdown with Python script → get title, images with block_index, HTML
2. Navigate to X Articles editor
3. Upload cover image (first image)
4. Fill title
5. Copy HTML to clipboard (Python) → Paste with Cmd+V
6. Insert content images at positions specified by block_index
7. Save as draft (NEVER auto-publish)

## Efficiency Guidelines

**Goal**: Minimize wait time between operations for a smooth automation experience.

### 1. Avoid Unnecessary browser_snapshot

Most browser operations (click, type, press_key, etc.) return page state in their results. **Do NOT** call `browser_snapshot` separately after each operation—use the returned page state directly.

```
❌ Wrong approach:
browser_click → browser_snapshot → analyze → browser_click → browser_snapshot → ...

✅ Correct approach:
browser_click → get page state from return result → browser_click → ...
```

### 2. Avoid Unnecessary browser_wait_for

Only use `browser_wait_for` when:
- Waiting for image upload to complete (`textGone="Uploading media"`)
- Waiting for initial page load (rare cases)

**Do NOT** use `browser_wait_for` to wait for buttons or input fields—they're available immediately after page load.

### 3. Parallel Execution of Independent Operations

When two operations have no dependencies, you can call multiple tools in the same message:

```
✅ Can parallelize:
- Fill title (browser_type) + Copy HTML to clipboard (Bash)
- Parse Markdown to JSON + Generate HTML file

❌ Cannot parallelize (have dependencies):
- Must click create before uploading cover image
- Must paste content before inserting images
```

### 4. Continuous Browser Operations

Each browser operation returns page state containing all needed element references. Use these references directly for the next step:

```
# Ideal flow (execute each step directly, no extra waiting):
browser_navigate → find create button from return state → browser_click(create)
→ find upload button from return state → browser_click(upload) → browser_file_upload
→ find apply button from return state → browser_click(apply)
→ find title box from return state → browser_type(title)
→ click editor → browser_press_key(Meta+v)
→ ...
```

### 5. Preparation Work First

Before starting browser operations, complete all preparation work:
1. Parse Markdown to get JSON data
2. Generate HTML file to /tmp/
3. Record title, cover_image, content_images, etc.

This way browser operations can execute continuously without stopping to process data mid-flow.

## Step 1: Parse Markdown (Python)

Use `parse_markdown.py` to extract all structured data:

```bash
python ~/.claude/skills/publish-x-article/scripts/parse_markdown.py /path/to/article.md
```

Output JSON:
```json
{
  "title": "Article Title",
  "cover_image": "/path/to/first-image.jpg",
  "content_images": [
    {"path": "/path/to/img2.jpg", "block_index": 5, "after_text": "context for debugging..."},
    {"path": "/path/to/img3.jpg", "block_index": 12, "after_text": "another context..."}
  ],
  "html": "<p>Content...</p><h2>Section</h2>...",
  "total_blocks": 45
}
```

**Key fields:**
- `block_index`: The image should be inserted AFTER block element at this index (0-indexed)
- `total_blocks`: Total number of block elements in the HTML
- `after_text`: Kept for reference/debugging only, NOT for positioning

Save HTML to temp file for clipboard:
```bash
python parse_markdown.py article.md --html-only > /tmp/article_html.html
```

## Step 2: Open X Articles Editor

```
browser_navigate: https://x.com/compose/articles
```

**Important**: After page load, it shows draft list, not the editor. You need to:

1. **Wait for page load complete**: Use `browser_snapshot` to check page state
2. **Click "create" button immediately**: Don't wait for "Add title" or other editor elements—they only appear after clicking create
3. **Wait for editor to load**: After clicking create, wait for editor elements to appear

```
# 1. Navigate to page
browser_navigate: https://x.com/compose/articles

# 2. Get page snapshot, find create button
browser_snapshot

# 3. Click create button (usually ref like "create" or has create label)
browser_click: element="create button", ref=<create_button_ref>

# 4. Now the editor should be open, continue with cover image upload, etc.
```

**Note**: Do NOT use `browser_wait_for text="Add title"` to wait for page load, as this text only appears after clicking create—it will cause a timeout.

If login needed, prompt user to log in manually.

## Step 3: Upload Cover Image

1. Click "Add photo or video" button
2. Use browser_file_upload with the cover image path (from JSON output)
3. Verify image uploaded

## Step 4: Fill Title

- Find textbox with "Add title" placeholder
- Use browser_type to input title (from JSON output)

## Step 5: Paste Text Content (Python Clipboard)

Copy HTML to system clipboard using Python, then paste:

```bash
# Copy HTML to clipboard
python ~/.claude/skills/publish-x-article/scripts/copy_to_clipboard.py html --file /tmp/article_html.html
```

Then in browser:
```
browser_click on editor textbox
browser_press_key: Meta+v
```

This preserves all rich text formatting (H2, bold, links, lists).

## Step 6: Insert Content Images (Block Index Positioning)

**Key improvement**: Use `block_index` for precise positioning instead of relying on text matching.

### Positioning Principle

After pasting HTML, the editor content consists of a series of block elements (paragraphs, headers, quotes, etc.). Each image's `block_index` indicates it should be inserted after the Nth block element.

### Steps

1. **Get all block elements**: Use browser_snapshot to get editor content, find all child elements under textbox
2. **Position by index**: Click the corresponding block element based on `block_index`
3. **Paste image**: Copy image to clipboard and paste

For each content image (from `content_images` array):

```bash
# 1. Copy image to clipboard (with compression)
python ~/.claude/skills/publish-x-article/scripts/copy_to_clipboard.py image /path/to/img.jpg --quality 85
```

```
# 2. Click the block element at block_index
# Example: if block_index=5, click the 6th block element (0-indexed)
browser_click on the element at position block_index in the editor

# 3. Paste image
browser_press_key: Meta+v

# 4. Wait for upload (use short time, returns immediately when done)
browser_wait_for textGone="Uploading media" time=2
```

### Positioning Strategy

In the structure returned by browser_snapshot, editor content is typically:
```yaml
textbox [ref=xxx]:
  generic [ref=block0]:  # block_index 0
    - paragraph content
  heading [ref=block1]:   # block_index 1
    - h2 content
  generic [ref=block2]:  # block_index 2
    - paragraph content
  ...
```

To insert an image after `block_index=5`:
1. Find the 6th child element under the editor textbox (index starts from 0)
2. Click that element
3. Paste image

**Note**: After inserting each image, subsequent images' actual positions will shift. It's recommended to insert images in **descending order of block_index**, so earlier insertions won't affect subsequent indices.

### Reverse Insertion Example

If there are 3 images with block_index 5, 12, 27:
1. First insert the image at block_index=27
2. Then insert the image at block_index=12
3. Finally insert the image at block_index=5

This way each insertion won't affect previously positioned locations.

## Step 7: Save Draft

1. Verify content pasted (check word count indicator)
2. Draft auto-saves, or click Save button if needed
3. Click "Preview" to verify formatting
4. Report: "Draft saved. Review and publish manually."

## Critical Rules

1. **NEVER publish** - Only save draft
2. **First image = cover** - Upload first image as cover image
3. **Rich text conversion** - Always convert Markdown to HTML before pasting
4. **Use clipboard API** - Paste via clipboard for proper formatting
5. **Block index positioning** - Use block_index for precise image placement
6. **Reverse order insertion** - Insert images from highest to lowest block_index
7. **H1 title handling** - H1 is used as title only, not included in body

## Supported Formatting

- H2 headers (## )
- Blockquotes (> )
- Code blocks (``` ... ```) - converted to blockquotes since X doesn't support `<pre><code>`
- Bold text (**)
- Hyperlinks ([text](url))
- Ordered lists (1. 2. 3.)
- Unordered lists (- )
- Paragraphs

## Example Flow

User: "Publish /path/to/article.md to X"

```bash
# Step 1: Parse Markdown
python ~/.claude/skills/publish-x-article/scripts/parse_markdown.py /path/to/article.md > /tmp/article.json
python ~/.claude/skills/publish-x-article/scripts/parse_markdown.py /path/to/article.md --html-only > /tmp/article_html.html
```

2. Navigate to https://x.com/compose/articles
3. Upload cover image (browser_file_upload for cover only)
4. Fill title (from JSON: `title`)
5. Copy & paste HTML:
   ```bash
   python ~/.claude/skills/publish-x-article/scripts/copy_to_clipboard.py html --file /tmp/article_html.html
   ```
   Then: browser_press_key Meta+v
6. For each content image, **in reverse order of block_index**:
   ```bash
   python copy_to_clipboard.py image /path/to/img.jpg --quality 85
   ```
   - Click block element at `block_index` position
   - browser_press_key Meta+v
   - Wait until upload complete
7. Verify in preview
8. "Draft saved. Please review and publish manually."

## Best Practices

### Why Use block_index Instead of Text Matching?

1. **Precise positioning**: Doesn't depend on text content, correctly positions even with similar text in multiple places
2. **Reliability**: Index is deterministic, won't be confused by similar text
3. **Easy debugging**: `after_text` is still kept for manual verification

### Why Use Python Instead of Browser JavaScript?

1. **More reliable local processing**: Python operates system clipboard directly, not restricted by browser sandbox
2. **Image compression**: Compress images before upload (--quality 85), reduces upload time
3. **Code reuse**: Scripts are fixed, no need to rewrite conversion logic each time
4. **Easy debugging**: Scripts can be tested independently, problems are easy to locate

### Waiting Strategy

**Key understanding**: The `textGone` parameter of `browser_wait_for` returns **immediately** when text disappears. `time` is only the maximum wait time, not a fixed wait time.

- ❌ Conservative waiting: `time=5` or `time=10`, if upload only takes 2 seconds, remaining time is wasted
- ✅ Short interval polling: `time=2`, returns immediately when condition is met, waits max 2 seconds

```
# Correct usage: short time value, returns immediately when condition met
browser_wait_for textGone="Uploading media" time=2

# Wrong usage: fixed long wait
browser_wait_for time=5  # Unconditional 5-second wait, wastes time
```

**Principle**: Don't assume "how long to wait", instead set a reasonable maximum and let condition checking return as soon as possible.

### Image Insertion Efficiency

Browser operations per image reduced from 5 steps to 2:
- Old: click → add media → media → add photo → file_upload
- New: click paragraph → Meta+v

### Cover Image vs Content Images

- **Cover image**: Use browser_file_upload (because there's a dedicated upload button)
- **Content images**: Use Python clipboard + paste (more efficient)
