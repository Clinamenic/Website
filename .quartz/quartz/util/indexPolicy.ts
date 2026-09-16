/**
 * Search-engine indexability for published Quartz pages.
 *
 * - `index: true` / `"true"` always opts in (sitemap/RSS; no noindex)
 * - `index: false` / `"false"` always opts out
 * - `type: zettel` defaults to opt-out
 * - all other types default to opt-in
 *
 * FlexSearch (`searchable`) is separate and controlled by contentType profiles.
 */
export function isSearchEngineIndexed(frontmatter: {
  type?: unknown
  index?: unknown
}): boolean {
  if (frontmatter.index === true || frontmatter.index === "true") return true
  if (frontmatter.index === false || frontmatter.index === "false") return false
  const type = typeof frontmatter.type === "string" ? frontmatter.type.trim() : ""
  if (type === "zettel") return false
  return true
}
