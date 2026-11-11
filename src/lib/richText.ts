import sanitizeHtml from "sanitize-html";

/** Course descriptions come from the panel's rich-text editor (HTML). Keep formatting tags only; drop scripts, styles and handlers. */
export function safeRichText(html: string): string {
  const looksHtml = /<[a-z][\s\S]*>/i.test(html);
  const source = looksHtml ? html : html.split(/\n{2,}/).map((p) => `<p>${sanitizeHtml(p, { allowedTags: [] }).replace(/\n/g, "<br/>")}</p>`).join("");
  return sanitizeHtml(source, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "a", "code", "pre", "hr", "span"],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: { a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer nofollow" }), h1: "h2" },
  });
}

/** Rich text has no visible words (e.g. "<p></p>"). */
export const isBlankRichText = (html: string) => sanitizeHtml(html, { allowedTags: [] }).trim() === "";
