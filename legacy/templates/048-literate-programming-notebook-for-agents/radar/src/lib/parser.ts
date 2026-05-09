export interface ParsedBlock {
  type: "prose" | "code";
  content: string;
  language?: string;
  speaker?: string;
}

export function parseConversation(input: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  const lines = input.split("\n");
  let currentProse = "";
  let inCodeBlock = false;
  let codeContent = "";
  let codeLang = "";

  for (const line of lines) {
    if (!inCodeBlock && line.trim().startsWith("```")) {
      if (currentProse.trim()) {
        blocks.push({ type: "prose", content: currentProse.trim() });
        currentProse = "";
      }
      inCodeBlock = true;
      codeLang = line.trim().slice(3).trim() || "text";
      codeContent = "";
    } else if (inCodeBlock && line.trim() === "```") {
      blocks.push({
        type: "code",
        content: codeContent.trim(),
        language: codeLang,
      });
      inCodeBlock = false;
      codeContent = "";
      codeLang = "";
    } else if (inCodeBlock) {
      codeContent += (codeContent ? "\n" : "") + line;
    } else {
      currentProse += (currentProse ? "\n" : "") + line;
    }
  }

  if (inCodeBlock && codeContent.trim()) {
    blocks.push({
      type: "code",
      content: codeContent.trim(),
      language: codeLang,
    });
  }
  if (currentProse.trim()) {
    blocks.push({ type: "prose", content: currentProse.trim() });
  }

  // If no code blocks were found, try to detect indented code
  if (blocks.every((b) => b.type === "prose")) {
    return detectImplicitCodeBlocks(input);
  }

  return blocks;
}

function detectImplicitCodeBlocks(input: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  const lines = input.split("\n");
  let currentProse = "";
  let currentCode = "";

  for (const line of lines) {
    const isCode =
      line.startsWith("    ") ||
      line.startsWith("\t") ||
      /^(import |from |def |class |function |const |let |var |export |return |if |for |while )/.test(
        line.trim()
      );

    if (isCode) {
      if (currentProse.trim()) {
        blocks.push({ type: "prose", content: currentProse.trim() });
        currentProse = "";
      }
      currentCode += (currentCode ? "\n" : "") + line;
    } else {
      if (currentCode.trim()) {
        blocks.push({
          type: "code",
          content: currentCode.trim(),
          language: detectLanguage(currentCode),
        });
        currentCode = "";
      }
      currentProse += (currentProse ? "\n" : "") + line;
    }
  }

  if (currentCode.trim()) {
    blocks.push({
      type: "code",
      content: currentCode.trim(),
      language: detectLanguage(currentCode),
    });
  }
  if (currentProse.trim()) {
    blocks.push({ type: "prose", content: currentProse.trim() });
  }

  return blocks;
}

function detectLanguage(code: string): string {
  if (/\b(def |import |from |class .*:)/.test(code)) return "python";
  if (/\b(func |go |package |fmt\.)/.test(code)) return "go";
  if (/\b(fn |let mut |use |impl )/.test(code)) return "rust";
  if (/\b(const |let |var |=>|function )/.test(code)) return "typescript";
  if (/\b(<div|<span|className)/.test(code)) return "tsx";
  if (/<[a-z]+[\s>]/.test(code)) return "html";
  if (/\{[\s\n]*"/.test(code)) return "json";
  return "text";
}

export function blocksToMarkdown(blocks: ParsedBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "code") {
        return `\`\`\`${block.language || ""}\n${block.content}\n\`\`\``;
      }
      return block.content;
    })
    .join("\n\n");
}

export function extractAllCode(blocks: ParsedBlock[]): string {
  return blocks
    .filter((b) => b.type === "code")
    .map((b) => `// --- ${b.language || "code"} ---\n${b.content}`)
    .join("\n\n");
}
