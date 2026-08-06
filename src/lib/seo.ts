export function metaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSentence = cut.lastIndexOf('. ');
  const lastSpace = cut.lastIndexOf(' ');
  const boundary = lastSentence > max * 0.6 ? lastSentence + 1 : lastSpace;
  return clean.slice(0, boundary > 0 ? boundary : max).trim().replace(/[,;:]$/, '') + '…';
}

export function calcTitle(name: string): string {
  const base = name.replace(/\s*Calculator\s*$/i, '');
  const withYear = `${base} Calculator (2026)`;
  return withYear.length <= 62 ? withYear : name;
}
