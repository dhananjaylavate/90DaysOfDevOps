---
name: md-formatting
description: "Apply consistent Markdown formatting to all .md files in this repository, with commands formatted as code and emojis used for emphasis and clarity."
applyTo: "**/*.md"
---

Use this instruction for every Markdown file in the repository.

- Format commands and CLI examples using inline backticks for commands (`git status`) and fenced code blocks for longer snippets.
- Use headings, lists, and bold text to structure content clearly.
- Add emojis for emphasis and readability, for example:
  - ✅ for success or recommended actions
  - ⚠️ for warnings and caveats
  - 💡 for tips and notes
  - 🔧 for technical steps
- Keep prose clear and concise, with proper sentence spacing.
- Avoid raw unformatted command text in paragraphs; commands should always be in Markdown code formatting.
- Ensure generated or updated Markdown follows the repo's consistent style across `README.md`, lesson notes, and other `.md` files.
