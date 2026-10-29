/**
 * Publication data pipeline: HAL cache -> overrides -> normalized records.
 * Everything here runs at build time; nothing is fetched in the browser.
 */

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { config } from './config';

/** Raw HAL document (subset of fields we request). */
export interface HalDoc {
  docid?: string;
  halId_s?: string;
  title_s: string[];
  authFullName_s: string[];
  docType_s?: string;
  publicationDateY_i?: number;
  journalTitle_s?: string;
  conferenceTitle_s?: string;
  bookTitle_s?: string;
  volume_s?: string;
  page_s?: string;
  issue_s?: string;
  publisher_s?: string;
  doiId_s?: string;
  uri_s?: string;
  fileMain_s?: string;
  schoolName_s?: string;
  defenceDateY_i?: number;
  label_s?: string;
  abstract_s?: string[];
  [key: string]: unknown;
}

/** Normalized publication record used by the pages. */
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  docType: string;
  journal?: string;
  conference?: string;
  school?: string;
  volume?: string;
  pages?: string;
  publisher?: string;
  doi?: string;
  halUrl?: string;
  pdf?: string;
  abstract?: string;
}

/** Category order on the publications page. */
export const CATEGORY_ORDER = [
  'Journal articles',
  'International conferences',
  'National conferences',
  'Preprints',
  'Thesis',
  'Other',
] as const;

export type Category = (typeof CATEGORY_ORDER)[number];

function categoryOf(docType: string): Category {
  switch (docType) {
    case 'ART':
      return 'Journal articles';
    case 'COMM':
      return 'International conferences';
    case 'NATCOMM': // custom type used in publications-overrides.yaml
      return 'National conferences';
    case 'UNDEFINED':
      return 'Preprints';
    case 'THESE':
    case 'HDR':
      return 'Thesis';
    case 'OTHER':
    case 'OUV':
    case 'COV':
    case 'PATENT':
    case 'LECTURE':
      return 'Other';
    default:
      return 'Other';
  }
}

function normalize(doc: HalDoc): Publication {
  return {
    id: (doc.halId_s ?? doc.docid ?? '').replace(/^hal-/, ''),
    title: doc.title_s?.[0] ?? '',
    authors: doc.authFullName_s ?? [],
    year: doc.publicationDateY_i ?? doc.defenceDateY_i ?? 0,
    docType: doc.docType_s ?? 'OTHER',
    journal: doc.journalTitle_s ?? undefined,
    conference: doc.conferenceTitle_s ?? doc.bookTitle_s ?? undefined,
    school: doc.schoolName_s ?? undefined,
    volume: doc.volume_s ?? undefined,
    pages: doc.page_s ?? undefined,
    publisher: doc.publisher_s ?? undefined,
    doi: doc.doiId_s ?? undefined,
    halUrl: doc.uri_s ?? undefined,
    pdf: doc.fileMain_s ?? undefined,
    abstract: doc.abstract_s?.[0] ?? undefined,
  };
}

interface Overrides {
  exclude: string[];
  patch: Record<string, Partial<HalDoc>>;
  add: HalDoc[];
}

function loadOverrides(): Overrides {
  const file = path.resolve('src/data/publications-overrides.yaml');
  if (!fs.existsSync(file)) return { exclude: [], patch: {}, add: [] };
  return yaml.load(fs.readFileSync(file, 'utf-8')) as Overrides;
}

function loadCache(): HalDoc[] {
  const file = path.resolve('src/data/hal-cache.json');
  const cache = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return cache.docs as HalDoc[];
}

/** All publications, normalized, patched, deduplicated and sorted (newest first). */
export function getPublications(): Publication[] {
  const overrides = loadOverrides();
  const excluded = new Set(overrides.exclude.map((id) => id.replace(/^hal-/, '')));

  let docs = [...loadCache(), ...overrides.add];

  // Apply per-id patches (keys may or may not carry the "hal-" prefix)
  docs = docs.map((doc) => {
    const id = (doc.halId_s ?? doc.docid ?? '').replace(/^hal-/, '');
    const patch = overrides.patch[id] ?? overrides.patch[`hal-${id}`];
    return patch ? { ...doc, ...patch } : doc;
  });

  // Deduplicate by id (manual additions can collide with HAL versions)
  const seen = new Set<string>();
  docs = docs.filter((doc) => {
    const id = (doc.halId_s ?? doc.docid ?? '').replace(/^hal-/, '');
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  return docs
    .map(normalize)
    .filter((pub) => !excluded.has(pub.id))
    .sort((a, b) => b.year - a.year);
}

/** Publications grouped by category, ordered as CATEGORY_ORDER. */
export function getGroupedPublications(): Array<{ category: Category; publications: Publication[] }> {
  const pubs = getPublications();
  const groups = new Map<Category, Publication[]>();
  for (const pub of pubs) {
    const cat = categoryOf(pub.docType);
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)!.push(pub);
  }
  return CATEGORY_ORDER.map((category) => ({
    category,
    publications: groups.get(category) ?? [],
  })).filter((g) => g.publications.length > 0);
}

/** Venue string rendered under the authors. */
export function venueOf(pub: Publication): string {
  const parts: string[] = [];
  if (pub.journal) parts.push(pub.journal);
  if (pub.conference) parts.push(pub.conference);
  if (pub.volume) parts.push(`vol. ${pub.volume}`);
  if (pub.pages) parts.push(`p. ${pub.pages}`);
  if (pub.school) parts.push(pub.school);
  return parts.join(', ');
}

/** Author list with the site owner's name emphasized. */
export function emphasizedAuthors(pub: Publication): string {
  const owner = config.profile.name;
  return pub.authors
    .map((a) => (a === owner ? `<strong>${a}</strong>` : a))
    .join(', ');
}

/** Generate a clean BibTeX entry for a publication. */
export function bibtexOf(pub: Publication): string {
  const key = `${(pub.authors[0] ?? 'anon').split(' ').pop()!.toLowerCase()}${pub.year}${pub.id}`;
  const lines: string[] = [];
  const bibtexType =
    pub.docType === 'ART'
      ? 'article'
      : pub.docType === 'THESE' || pub.docType === 'HDR'
        ? 'phdthesis'
        : 'inproceedings';

  lines.push(`@${bibtexType}{${key},`);
  lines.push(`  title       = {${pub.title}},`);
  lines.push(`  author      = {${pub.authors.join(' and ')}},`);
  if (bibtexType === 'article') {
    lines.push(`  journal     = {${pub.journal ?? ''}},`);
    if (pub.volume) lines.push(`  volume      = {${pub.volume}},`);
    if (pub.pages) lines.push(`  pages       = {${pub.pages}},`);
    if (pub.publisher) lines.push(`  publisher   = {${pub.publisher}},`);
  } else if (bibtexType === 'phdthesis') {
    lines.push(`  school      = {${pub.school ?? ''}},`);
  } else {
    lines.push(`  booktitle   = {${pub.conference ?? pub.journal ?? ''}},`);
    if (pub.pages) lines.push(`  pages       = {${pub.pages}},`);
    if (pub.publisher) lines.push(`  publisher   = {${pub.publisher}},`);
  }
  lines.push(`  year        = {${pub.year}},`);
  if (pub.doi) lines.push(`  doi         = {${pub.doi}},`);
  if (pub.halUrl) lines.push(`  url         = {${pub.halUrl}},`);
  lines.push('}');
  return lines.join('\n');
}
