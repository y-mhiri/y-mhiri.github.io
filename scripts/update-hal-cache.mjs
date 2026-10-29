/**
 * Fetches publications from the HAL API and writes them to
 * src/data/hal-cache.json. This file is committed to the repository
 * and used as a fallback if HAL is unreachable during a build.
 *
 * Run standalone:  npm run update:hal
 * Also runs automatically before every `npm run build`.
 */

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE_FILE = path.join(ROOT, 'src', 'data', 'hal-cache.json');
const API = 'https://api.archives-ouvertes.fr/search/';

const FIELDS = [
  'docid',
  'halId_s',
  'title_s',
  'authFullName_s',
  'docType_s',
  'publicationDateY_i',
  'journalTitle_s',
  'conferenceTitle_s',
  'bookTitle_s',
  'volume_s',
  'page_s',
  'issue_s',
  'publisher_s',
  'doiId_s',
  'uri_s',
  'fileMain_s',
  'schoolName_s',
  'defenceDateY_i',
  'label_s',
  'abstract_s',
].join(',');

const cfg = yaml.load(fs.readFileSync(path.join(ROOT, 'config.yaml'), 'utf-8'));
const url = `${API}?q=${encodeURIComponent(cfg.hal.query)}&wt=json&rows=200&sort=publicationDateY_i%20desc&fl=${FIELDS}`;

async function fetchHal() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HAL API responded ${res.status}`);
    const json = await res.json();
    if (!json?.response?.docs) throw new Error('Unexpected HAL API response shape');
    return json.response.docs;
  } finally {
    clearTimeout(timeout);
  }
}

try {
  const docs = await fetchHal();
  const cache = {
    fetched_at: new Date().toISOString(),
    source: url,
    docs,
  };
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n');
  console.log(`HAL cache updated: ${docs.length} documents written to src/data/hal-cache.json`);
} catch (err) {
  if (fs.existsSync(CACHE_FILE)) {
    console.warn(`Warning: HAL fetch failed (${err.message}). Falling back to the existing hal-cache.json.`);
  } else {
    console.error(`Error: HAL fetch failed and no cache file exists yet (${err.message}).`);
    process.exit(1);
  }
}
