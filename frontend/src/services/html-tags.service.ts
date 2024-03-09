import DOMPurify from "dompurify";

export type AllowedTags = "a" | "code" | "i" | "strong";
class HtmlTagsService {
  private readonly allowedTags: AllowedTags[] = ["a", "code", "i", "strong"];

  wrapSelectedTextWithTag(
    tag: AllowedTags,
    text: string,
    startPos: number,
    endPos: number
  ): { text: string; wrapEndPos: number } {
    let wrappedText: string | undefined;
    if (startPos === endPos) {
      wrappedText = this.wrapWithTag(tag);
    } else {
      wrappedText = this.wrapWithTag(tag, text.substring(startPos, endPos));
    }
    const resultText =
      text.substring(0, startPos) +
      wrappedText +
      text.substring(endPos, text.length);
    const wrapEndPos = startPos + wrappedText.length;

    return { text: resultText, wrapEndPos };
  }

  wrapWithTag(tag: AllowedTags, text: string = ""): string {
    switch (tag) {
      case "a":
        return this.wrapWithA(text);
      case "code":
        return this.wrapWithCode(text);
      case "i":
        return this.wrapWithI(text);
      case "strong":
        return this.wrapWithStrong(text);
    }
  }

  transformHtmlText(initialHtml: string): string {
    DOMPurify.addHook("afterSanitizeAttributes", function (node) {
      if (node.nodeName.toLowerCase() !== "a") {
        node.removeAttribute("href");
        node.removeAttribute("title");
      }
    });
    const parser = new DOMParser();
    const doc = parser.parseFromString(initialHtml, "text/html");
    const body = doc.body;

    // Recursively remove empty nodes
    this.removeEmptyNodes(body);

    // Serialize the cleaned body back into HTML
    const html = body.innerHTML;

    const cleanText = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: this.allowedTags,
      ALLOWED_ATTR: ["href", "title"],
      ALLOWED_URI_REGEXP:
        /^(ftp:\/\/|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
      FORBID_ATTR: ["style"],
    });

    return cleanText;
  }

  private removeEmptyNodes(node: ChildNode) {
    const children = node.childNodes;
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      if (this.isEmptyElement(child)) {
        node.removeChild(child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        this.removeEmptyNodes(child);
      }
    }
  }

  private isEmptyElement(element: ChildNode) {
    return (
      !element.textContent ||
      (!element.hasChildNodes() && element.textContent.trim() === "")
    );
  }

  private wrapWithA(text: string) {
    return `<a href="" title="">${text}</a>`;
  }

  private wrapWithCode(text: string) {
    return `<code>${text}</code>`;
  }

  private wrapWithI(text: string) {
    return `<i>${text}</i>`;
  }

  private wrapWithStrong(text: string) {
    return `<strong>${text}</strong>`;
  }
}
const htmlTagsService = new HtmlTagsService();
export default htmlTagsService;
