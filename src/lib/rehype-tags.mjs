// Turns plain-Markdown conventions into styled elements on the site, while
// the same Markdown stays readable on dev.to and when pasted into LinkedIn:
//   **ACT NOW** / **WATCH** / **CONTEXT**  -> tag pill
//   a paragraph starting "Source:" or "Sources:" -> muted source line
//   site-relative links like [Watch](/watch) -> prefixed with the base path
const TAGS = { 'ACT NOW': 'act', WATCH: 'watch', CONTEXT: 'context' };

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
}

export default function rehypeTags({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
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
  };
}
