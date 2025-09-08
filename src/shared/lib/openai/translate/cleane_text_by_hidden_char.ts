export function cleanHiddenCharacters(text: string): string {
  const cleanedText = text.replace(/<think[^>]*>[\s\S]*?<\/think>/g, "");

  return cleanedText.replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, "").trim();
}
