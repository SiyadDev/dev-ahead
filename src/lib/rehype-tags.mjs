// Turns plain-Markdown conventions into styled elements on the site, while
// the same Markdown stays readable on dev.to and when pasted into LinkedIn:
//   **ACT NOW** / **WATCH** / **CONTEXT**  -> tag pill
//   a paragraph starting "Source:" or "Sources:" -> muted source line
//   site-relative links like [Watch](/watch) -> prefixed with the base path
// It also strips anything executable that raw HTML in an issue could carry
// (script-like elements, on* handlers, javascript: URLs), as a second line of
// defence behind `npm run check`.
const TAGS = { 'ACT NOW': 'act', WATCH: 'watch', CONTEXT: 'context' };

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
}

const BLOCKED = new Set(['script', 'style', 'iframe', 'frame', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select', 'link', 'meta', 'base', 'svg', 'math']);
const UNSAFE_URL = /^\s*(javascript|vbscript|data):/i;

function sanitize(node) {
  if (!node.children) return;
  node.children = node.children.filter((c) => !(c.type === 'raw' || (c.type === 'element' && BLOCKED.has(c.tagName))));
  for (const child of node.children) {
    if (child.type !== 'element') continue;
    for (const key of Object.keys(child.properties ?? {})) {
      const value = child.properties[key];
      if (/^on/i.test(key) || ((key === 'href' || key === 'src' || key === 'action') && UNSAFE_URL.test(String(value)))) {
        delete child.properties[key];
      }
    }
    sanitize(child);
  }
}

export default function rehypeTags({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    sanitize(tree);
    walk(tree, (node) => {
      if (node.type !== 'element') return;

      if (node.tagName === 'strong') {
        const kind = TAGS[textOf(node).trim()];
        if (kind) {
          node.tagName = 'span';
          node.properties = { className: ['tag', `tag-${kind}`] };
        }
      }

      if (node.tagName === 'a') {
        const href = node.properties?.href;
        if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
          node.properties.href = `${prefix}${href}`;
        }
      }

      if (node.tagName === 'p' && /^Sources?:/.test(textOf(node).trim())) {
        node.properties = { ...node.properties, className: ['src'] };
      }
    });

    // Second pass, now that tags are spans: a paragraph that opens with a tag
    // is an item's tag line, and "Medium confidence." after it becomes a mark.
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'p') return;
      const [first, second] = node.children ?? [];
      if (isTag(first)) {
        node.properties = { ...node.properties, className: ['tagline'] };
        if (second?.type === 'text') {
          const m = second.value.match(/^\s*(low|medium|high) confidence\.?(.*)$/is);
          if (m) node.children.splice(1, 1, confidenceMark(m[1].toLowerCase()), ...rest(m[2]));
        }
      }
      // A paragraph that is only italics is an aside, such as the closing sourcing note.
      const kids = (node.children ?? []).filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (kids.length === 1 && kids[0].tagName === 'em') {
        node.properties = { ...node.properties, className: ['aside'] };
      }
    });

    wrapExperiment(tree);
  };
}

function isTag(node) {
  return node?.type === 'element' && node.properties?.className?.includes('tag');
}

const LEVELS = { low: 1, medium: 2, high: 3 };

function confidenceMark(level) {
  const dots = [1, 2, 3].map((i) => ({
    type: 'element',
    tagName: 'i',
    properties: { className: i <= LEVELS[level] ? ['on'] : [] },
    children: [],
  }));
  const label = `${level[0].toUpperCase()}${level.slice(1)} confidence`;
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: ['confidence', `confidence-${level}`] },
    children: [
      { type: 'element', tagName: 'span', properties: { className: ['dots'], ariaHidden: 'true' }, children: dots },
      { type: 'text', value: label },
    ],
  };
}

// Whatever followed "Medium confidence" (", unverified." for example) stays as text.
function rest(text) {
  const t = text.replace(/^[.\s]+$/, '');
  return t ? [{ type: 'text', value: t.startsWith(',') ? t : ` ${t.trim()}` }] : [];
}

// Gathers the experiment heading and everything after it, up to the closing
// rule or the next section, into one block so it can be set as a panel.
function wrapExperiment(tree) {
  const kids = tree.children ?? [];
  const start = kids.findIndex(
    (n) => n.type === 'element' && n.tagName === 'h2' && /^this week.s experiment/i.test(textOf(n).trim()),
  );
  if (start === -1) return;
  let end = start + 1;
  while (end < kids.length && !(kids[end].type === 'element' && ['hr', 'h2'].includes(kids[end].tagName))) end++;
  const section = {
    type: 'element',
    tagName: 'section',
    properties: { className: ['experiment'] },
    children: kids.slice(start, end),
  };
  kids.splice(start, end - start, section);
}
