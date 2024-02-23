import DOMPurify from "dompurify";

const allowedTags = ["a", "code", "i", "strong"];

export function transformHtmlText(initialHtml: string): string {
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
  removeEmptyNodes(body);

  // Serialize the cleaned body back into HTML
  const html = body.innerHTML;

  const cleanText = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: ["href", "title"],
    ALLOWED_URI_REGEXP:
      /^(ftp:\/\/|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
    FORBID_ATTR: ["style"],
  });

  return cleanText;
}

function removeEmptyNodes(node: ChildNode) {
  const children = node.childNodes;
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (isEmptyElement(child)) {
      node.removeChild(child);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      removeEmptyNodes(child);
    }
  }
}

function isEmptyElement(element: ChildNode) {
  return (
    !element.textContent ||
    (!element.hasChildNodes() && element.textContent.trim() === "")
  );
}
