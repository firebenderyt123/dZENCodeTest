import DOMPurify from "dompurify";

const allowedTags = ["a", "code", "i", "strong"];

export function transformHtmlText(text: string): string {
  const cleanText = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: ["href", "title"],
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_ATTR: ["style"],
  });

  return cleanText;
}
