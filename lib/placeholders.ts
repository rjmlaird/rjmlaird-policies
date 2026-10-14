/**
 * Placeholder conventions used across content/ and data/:
 *
 *   [[TODO: what is needed]]        unresolved text. Blocks publishing.
 *   {{site.contactEmail}}           variable, resolved from the registers at render time.
 *   {{site.siteUrl | link}}         variable with a filter (date, mailto, link, link:Label).
 *   {{include:retention}}           block generated from a register (see INCLUDE_NAMES).
 */

export const TODO_PATTERN = /\[\[TODO:?\s*([^\]]*)\]\]/g;
export const VARIABLE_PATTERN = /\{\{\s*([^{}]+?)\s*\}\}/g;

export const INCLUDE_NAMES = [
  "processing-activities",
  "processors",
  "transfers",
  "retention",
  "cookie-inventory",
  "cookie-preferences",
] as const;
export type IncludeName = (typeof INCLUDE_NAMES)[number];

/** Build an unresolved-placeholder marker. */
export const todo = (what: string): string => `[[TODO: ${what}]]`;

export const hasTodo = (text: string): boolean => /\[\[TODO/.test(text);

/** The "what is needed" text of every TODO marker in `text`. */
export function findTodos(text: string): string[] {
  return [...text.matchAll(TODO_PATTERN)].map((m) => (m[1] ?? "").trim());
}

/** Every {{…}} token in raw (un-rendered) markdown, split into variables and includes. */
export function findTokens(text: string): { variables: string[]; includes: string[] } {
  const variables: string[] = [];
  const includes: string[] = [];
  for (const m of text.matchAll(VARIABLE_PATTERN)) {
    const expr = (m[1] ?? "").trim();
    if (expr.startsWith("include:")) includes.push(expr.slice("include:".length).trim());
    else variables.push(expr.split("|")[0]!.trim());
  }
  return { variables, includes };
}
