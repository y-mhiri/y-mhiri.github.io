import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set to your GitHub Pages repository when deploying.
  site: 'https://y-mhiri.github.io',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  // Old URLs -> new pages. Add a line when you move or delete a page whose
  // link may have been shared. Old URLs ending in .html cannot go here:
  // they are small redirect files in public/stages/.
  redirects: {
    '/about': '/',
    '/cv': '/#career',
  },
});
