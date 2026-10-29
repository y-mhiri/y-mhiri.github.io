import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export interface Link {
  label: string;
  url: string;
}

export interface SiteConfig {
  site: {
    title: string;
    description: string;
  };
  profile: {
    name: string;
    photo: string;
    role: string;
    affiliation: string;
    address: string[] | null;
  };
  links: Link[];
  home: {
    recent_publications: number;
    sections: string[];
  };
  navigation: Array<{ title: string; url: string }>;
  hal: {
    id: string;
    query: string;
  };
  dark_mode: {
    enabled: boolean;
  };
}

/** Load the root config.yaml. Runs at build time only. */
export function loadConfig(): SiteConfig {
  const file = path.resolve('config.yaml');
  const raw = fs.readFileSync(file, 'utf-8');
  return yaml.load(raw) as SiteConfig;
}

export const config = loadConfig();
