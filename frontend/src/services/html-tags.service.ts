export type AllowedTags = "a" | "code" | "i" | "strong";

class HtmlTagsService {
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
