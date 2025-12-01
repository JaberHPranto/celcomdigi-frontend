/**
 * Convert markdown to plain text by removing formatting.
 * @param markdown - Markdown text to convert
 * @returns Plain text without markdown formatting
 */
export function markdownToPlainText(markdown: string): string {
    let text = markdown;

    // Remove headers (##, ###, etc.)
    text = text.replace(/^#{1,6}\s+/gm, "");

    // Remove bold/italic (**text**, *text*)
    text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
    text = text.replace(/\*([^*]+)\*/g, "$1");

    // Remove links [text](url) -> text
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    // Remove images ![alt](url)
    text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");

    // Remove horizontal rules
    text = text.replace(/^[-*_]{3,}$/gm, "");

    // Remove code blocks
    text = text.replace(/```[\s\S]*?```/g, "");
    text = text.replace(/`([^`]+)`/g, "$1");

    // Clean up excessive whitespace
    text = text.replace(/\n{3,}/g, "\n\n");
    text = text.trim();

    return text;
}
