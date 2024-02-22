export type AllowedTags = "a" | "code" | "i" | "strong";

class HtmlTagsService {
  getTag(tag: AllowedTags) {
    switch (tag) {
      case "a":
        return this.getATag();
      case "code":
        return this.getCodeTag();
      case "i":
        return this.getITag();
      case "strong":
        return this.getStrongTag();
    }
  }

  private getATag() {
    return '<a href="" title=""></a>';
  }

  private getCodeTag() {
    return "<code></code>";
  }

  private getITag() {
    return "<i></i>";
  }

  private getStrongTag() {
    return "<strong></strong>";
  }
}
const htmlTagsService = new HtmlTagsService();
export default htmlTagsService;
