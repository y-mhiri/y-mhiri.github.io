/**
 * Functional test of the publications filter bar using a headless DOM.
 * Load dist/publications/index.html, execute the page scripts, then
 * simulate search / category / sort interactions and assert the DOM.
 *
 * Run: node scripts/test-filter.mjs   (after a successful build)
 */

import fs from 'node:fs';
import assert from 'node:assert';
import { Window } from 'happy-dom';

const html = fs.readFileSync('dist/publications/index.html', 'utf-8');

const window = new Window({
  url: 'https://y-mhiri.github.io/publications/',
  settings: {
    disableJavaScriptFileLoading: true,
    enableJavaScriptEvaluation: true,
  },
});
window.document.write(html);
await window.happyDOM.waitUntilComplete();

const doc = window.document;

const visibleItems = () =>
  [...doc.querySelectorAll('#pub-groups > section')]
    .filter((s) => !s.hidden)
    .flatMap((s) => [...s.querySelectorAll('.pub-item')].filter((el) => !el.hidden));
const sectionTitles = () =>
  [...doc.querySelectorAll('#pub-groups > section')]
    .filter((s) => !s.hidden)
    .map((s) => s.dataset.category);
const yearsIn = (cat) =>
  [...doc.querySelectorAll(`.pub-item[data-category="${cat}"]`)]
    .filter((el) => !el.hidden)
    .map((el) => Number(el.dataset.year));

// --- initial state: everything visible, no status text
assert.strictEqual(visibleItems().length, 13, 'all 13 items visible initially');
assert.strictEqual(doc.getElementById('pub-count').textContent, '', 'count hidden initially');

// --- search: "hyperspectral" (1 match, in International conferences)
const search = doc.getElementById('pub-search');
search.value = 'hyperspectral';
search.dispatchEvent(new window.Event('input'));
assert.strictEqual(visibleItems().length, 1, 'search finds 1 item');
assert.ok(
  visibleItems()[0].dataset.title.includes('hyperspectral'),
  'the found item is the hyperspectral paper',
);

// --- search reset + category uncheck: only Journal articles
search.value = '';
search.dispatchEvent(new window.Event('input'));
for (const cb of doc.querySelectorAll('input[name="category"]')) {
  cb.checked = cb.value === 'Journal articles';
  cb.dispatchEvent(new window.Event('change'));
}
assert.deepStrictEqual(
  sectionTitles(),
  ['Journal articles'],
  'only Journal articles section remains',
);
assert.strictEqual(visibleItems().length, 4, '4 journal articles');
assert.ok(doc.getElementById('pub-empty').hidden, 'not in empty state');

// --- sorting: year ascending within the visible section
const sort = doc.getElementById('pub-sort');
for (const mode of ['year-asc', 'year-desc']) {
  sort.value = mode;
  sort.dispatchEvent(new window.Event('change'));
  const years = yearsIn('Journal articles');
  const expected = [...years].sort((a, b) => (mode === 'year-asc' ? a - b : b - a));
  assert.deepStrictEqual(years, expected, `sort ${mode} orders years correctly`);
}

// --- no results: bogus search shows the empty message
for (const cb of doc.querySelectorAll('input[name="category"]')) cb.checked = true;
search.value = 'zzzznotfound';
search.dispatchEvent(new window.Event('input'));
assert.strictEqual(visibleItems().length, 0, 'no items match');
assert.ok(!doc.getElementById('pub-empty').hidden, 'empty message shown');
assert.strictEqual(
  doc.getElementById('pub-count').textContent,
  '0 of 13 shown',
  'count reads 0 of 13',
);

// --- restore everything
search.value = '';
search.dispatchEvent(new window.Event('input'));
for (const cb of doc.querySelectorAll('input[name="category"]')) cb.checked = true;
const firstCheckbox = doc.querySelector('input[name="category"]');
firstCheckbox.dispatchEvent(new window.Event('change'));
assert.strictEqual(visibleItems().length, 13, 'restored to 13 items');

console.log('All filter tests passed.');
await window.happyDOM.close();
