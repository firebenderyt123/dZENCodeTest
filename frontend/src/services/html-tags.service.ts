export type AllowedTags = "a" | "code" | "i" | "strong";

class HtmlTagsService {
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
