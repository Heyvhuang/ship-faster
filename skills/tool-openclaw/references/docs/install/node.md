<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/node.md; fetched_at=2026-02-20T10:29:22.522Z; sha256=82d243223bbca0b292c0b7096783b3b5fbcfcc5204364de341ee94c1dadcedfb; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Node.js

# Node.js

OpenClaw requires **Node 22 or newer**. The [installer script](/install#install-methods) will detect and install Node automatically — this page is for when you want to set up Node yourself and make sure everything is wired up correctly (versions, PATH, global installs).

## Check your version

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
node -v
```

If this prints `v22.x.x` or higher, you're good. If Node isn't installed or the version is too old, pick an install method below.

## Install Node

<Tabs>
  <Tab title="macOS">
    **Homebrew** (recommended):

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    brew install node
    ```

    Or download the macOS installer from [nodejs.org](https://nodejs.org/).
  </Tab>

  <Tab title="Linux">
    **Ubuntu / Debian:**

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

    **Fedora / RHEL:**

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    sudo dnf install nodejs
    ```

    Or use a version manager (see below).
  </Tab>

  <Tab title="Windows">
    **winget** (recommended):

    ```powershell  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    winget install OpenJS.NodeJS.LTS
    ```

    **Chocolatey:**

    ```powershell  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    choco install nodejs-lts
    ```

    Or download the Windows installer from [nodejs.org](https://nodejs.org/).
  </Tab>
</Tabs>

<Accordion title="Using a version manager (nvm, fnm, mise, asdf)">
  Version managers let you switch between Node versions easily. Popular options:

  * [**fnm**](https://github.com/Schniz/fnm) — fast, cross-platform
  * [**nvm**](https://github.com/nvm-sh/nvm) — widely used on macOS/Linux
  * [**mise**](https://mise.jdx.dev/) — polyglot (Node, Python, Ruby, etc.)

  Example with fnm:

  ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
  fnm install 22
  fnm use 22
  ```

  <Warning>
    Make sure your version manager is initialized in your shell startup file (`~/.zshrc` or `~/.bashrc`). If it isn't, `openclaw` may not be found in new terminal sessions because the PATH won't include Node's bin directory.
  </Warning>
</Accordion>

## Troubleshooting

### `openclaw: command not found`

This almost always means npm's global bin directory isn't on your PATH.

<Steps>
  <Step title="Find your global npm prefix">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    npm prefix -g
    ```
  </Step>

  <Step title="Check if it's on your PATH">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    echo "$PATH"
    ```

    Look for `<npm-prefix>/bin` (macOS/Linux) or `<npm-prefix>` (Windows) in the output.
  </Step>

  <Step title="Add it to your shell startup file">
    <Tabs>
      <Tab title="macOS / Linux">
        Add to `~/.zshrc` or `~/.bashrc`:

        ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
        export PATH="$(npm prefix -g)/bin:$PATH"
        ```

        Then open a new terminal (or run `rehash` in zsh / `hash -r` in bash).
      </Tab>

      <Tab title="Windows">
        Add the output of `npm prefix -g` to your system PATH via Settings → System → Environment Variables.
      </Tab>
    </Tabs>
  </Step>
</Steps>

### Permission errors on `npm install -g` (Linux)

If you see `EACCES` errors, switch npm's global prefix to a user-writable directory:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
mkdir -p "$HOME/.npm-global"
npm config set prefix "$HOME/.npm-global"
export PATH="$HOME/.npm-global/bin:$PATH"
```

Add the `export PATH=...` line to your `~/.bashrc` or `~/.zshrc` to make it permanent.
