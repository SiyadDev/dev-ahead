// Turns plain-Markdown conventions into styled elements on the site, while
// the same Markdown stays readable on dev.to and when pasted into LinkedIn:
//   **ACT NOW** / **WATCH** / **CONTEXT**  -> tag pill
//   a paragraph starting "Source:" or "Sources:" -> muted source line
//   site-relative links like [Watch](/watch) -> prefixed with the base path
// It also strips anything executable that raw HTML in an issue could carry
// (script-like elements, on* handlers, javascript: URLs), as a second line of
// defence behind `npm run check`.
import { TAGS, LEVELS, parseConfidence } from './tagline.mjs';

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
          const c = parseConfidence(second.value);
          if (c) node.children.splice(1, 1, confidenceMark(c.level, c.unverified), ...rest(c.rest));
        }
      }
      // A paragraph that is only italics is an aside, such as the closing sourcing note.
      const kids = (node.children ?? []).filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (kids.length === 1 && kids[0].tagName === 'em') {
        node.properties = { ...node.properties, className: ['aside'] };
      }
    });

    structureSections(tree);
    labelParagraphs(tree);
    wrapExperiment(tree);
  };
}

// Section names are fixed by the editorial guide.
const SECTIONS = {
  'the top 3': 'top',
  'signal radar': 'radar',
  'research frontier': 'research',
  'new capabilities to adopt': 'capabilities',
  'disruption watch': 'watch',
  'architecture & practice shifts': 'practice',
  'practice shifts': 'practice',
  "this week's experiment": 'experiment',
};

const el = (tagName, className, children = [], extra = {}) => ({
  type: 'element',
  tagName,
  properties: { ...(className ? { className: [].concat(className) } : {}), ...extra },
  children,
});

const sectionKey = (h2) => SECTIONS[textOf(h2).trim().toLowerCase().replace(/[’']/g, "'")];

// Groups each section's items (an h3 and what follows it) so they can be set
// apart, turns research papers into cards and the Disruption watch list into
// a board. Everything is derived from the Markdown conventions in the
// editorial guide; anything that doesn't match is left as written.
function structureSections(tree) {
  const kids = tree.children ?? [];
  const out = [];
  let section;
  let item;
  for (const node of kids) {
    const tag = node.type === 'element' ? node.tagName : null;
    if (tag === 'h2' || tag === 'hr') {
      item = undefined;
      section = tag === 'h2' ? sectionKey(node) : undefined;
      if (tag === 'h2' && section) node.properties = { ...node.properties, dataSection: section };
      out.push(node);
      continue;
    }
    if (tag === 'h3' && section && section !== 'experiment') {
      item = el('div', section === 'research' ? ['item', 'paper'] : 'item', [], { dataSection: section });
      out.push(item);
    }
    if (item) {
      item.children.push(node);
      continue;
    }
    if (tag === 'ul' && section === 'watch') {
      out.push(boardFrom(node));
      continue;
    }
    out.push(node);
  }
  tree.children = out;
  for (const node of out) {
    if (node.properties?.className?.includes('paper')) paperCard(node);
  }
}

const RUNG_NAMES = ['Watching', 'Accelerating', 'Hitting the market', 'Repricing the work'];
const RUNG = RUNG_NAMES.join('|');
// "Repricing the work, held." / ": enters at Watching." / "Watching → Accelerating." / "moves from A to B"
const STATUS = new RegExp(
  `^[\\s:,.]*(?:enters at |moves? (?:up )?(?:from )?)?(${RUNG})(?:\\s*(?:→|->|to)\\s*(${RUNG}))?\\s*[,.;]?\\s*(held)?[,.;]?\\s*`,
  'i',
);
const rungNo = (name) => RUNG_NAMES.findIndex((r) => r.toLowerCase() === name.toLowerCase()) + 1;
const canon = (name) => RUNG_NAMES[rungNo(name) - 1];

// A bullet "**Name**: Rung, held. Detail" becomes a row with a rung badge.
function boardFrom(ul) {
  const rows = [];
  for (const li of ul.children ?? []) {
    if (li.type !== 'element' || li.tagName !== 'li') continue;
    const kids = li.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
    const [first, second] = kids;
    if (!(first?.tagName === 'strong' && second?.type === 'text')) {
      rows.push(el('li', 'dw-compact', li.children));
      continue;
    }
    let name = textOf(first).trim().replace(/[.:]$/, '');
    const isNew = /^new:\s*/i.test(name);
    name = name.replace(/^new:\s*/i, '');
    const m = second.value.match(STATUS);
    if (!m) {
      rows.push(el('li', 'dw-compact', li.children));
      continue;
    }
    const from = canon(m[1]);
    const to = m[2] ? canon(m[2]) : undefined;
    const moved = Boolean(to && to !== from);
    const rung = to ?? from;
    const rest = [{ type: 'text', value: second.value.slice(m[0].length) }, ...kids.slice(2)];
    const flag = moved ? 'Moved up' : isNew ? 'New' : undefined;
    const note = moved ? null : isNew ? 'New entry' : m[3] ? 'Held' : null;
    rows.push(
      el('li', ['dw-row', `r${rungNo(rung)}`, moved ? 'is-moved' : isNew ? 'is-new' : 'is-held'], [
        el('p', 'dw-name', [{ type: 'text', value: name }, ...(flag ? [el('span', 'dw-flag', [{ type: 'text', value: flag }])] : [])]),
        el('p', 'dw-status', [
          el('span', 'dw-badge', [{ type: 'text', value: moved ? `${from} → ${to}` : rung }]),
          ...(note ? [el('span', 'dw-note', [{ type: 'text', value: note }])] : []),
        ]),
        ...(rest.some((n) => textOf(n).trim()) ? [el('p', 'dw-detail', rest)] : []),
      ]),
    );
  }
  return el('ul', 'dw-board', rows);
}

// A research item's tag line "**WATCH** Medium confidence. Horizon: 12 months.
// Institution." becomes a meta row: institution in small capitals, then the
// tag, the horizon pill and the confidence mark. Older issues have no level.
function paperCard(item) {
  for (const p of item.children) {
    if (p.type !== 'element' || p.tagName !== 'p') continue;
    if (p.properties?.className?.includes('tagline')) {
      const [tag, ...after] = p.children;
      const conf = after[0]?.properties?.className?.includes('confidence') ? after.shift() : null;
      const [text, ...more] = after;
      const m = text?.type === 'text' ? text.value.match(/^\s*Horizon:\s*([^.]+)\.\s*(.*)$/is) : null;
      if (m) {
        const inst = m[2].trim().replace(/\.$/, '');
        p.properties = { className: ['paper-meta'] };
        p.children = [
          el('span', 'paper-tags', [
            tag,
            el('span', 'horizon', [{ type: 'text', value: m[1].trim() }]),
            ...(conf ? [conf] : []),
          ]),
          ...(inst ? [el('span', 'inst', [{ type: 'text', value: inst }, ...more])] : []),
        ];
      }
      continue;
    }
  }
}

// Run-in labels ("**Why it matters:**", "**Build:**", "**Done when:**") become a
// small label on their own line, so the takeaway reads as its own block.
const LABELS = { 'why it matters': 'why', build: 'build', 'done when': 'done' };

function labelParagraphs(tree) {
  walk(tree, (p) => {
    if (p.type !== 'element' || p.tagName !== 'p') return;
    const lead = p.children.find((c) => !(c.type === 'text' && !c.value.trim()));
    if (lead?.tagName !== 'strong') return;
    const name = textOf(lead).trim().replace(/:$/, '');
    const kind = LABELS[name.toLowerCase()];
    if (!kind) return;
    lead.properties = { className: ['run-label'] };
    lead.children = [{ type: 'text', value: name }];
    p.properties = { ...p.properties, className: [...(p.properties?.className ?? []), 'labelled', `labelled-${kind}`] };
    // The sentence after the label now starts the block, so it takes a capital.
    const next = p.children[p.children.indexOf(lead) + 1];
    if (next?.type === 'text') next.value = next.value.replace(/^\s*([a-z])/, (_, c) => c.toUpperCase());
  });
}

function isTag(node) {
  return node?.type === 'element' && node.properties?.className?.includes('tag');
}

// An unverified item still shows its level, but its dots are drawn as rings:
// a filled dot means a primary source was read.
function confidenceMark(level, unverified) {
  const dots = [1, 2, 3].map((i) => ({
    type: 'element',
    tagName: 'i',
    properties: { className: i <= LEVELS[level] ? ['on'] : [] },
    children: [],
  }));
  const name = `${level[0].toUpperCase()}${level.slice(1)}`;
  const label = level === 'speculative' ? name : `${name} confidence`;
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: ['confidence', `confidence-${level}`, ...(unverified ? ['is-unverified'] : [])] },
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
