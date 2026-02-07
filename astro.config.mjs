import { defineConfig } from 'astro/config';
import adapter from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  adapter: adapter(),
  integrations: [tailwind(), react()],
  output: 'static',
  site: 'https://unbiasor.com',
  vite: {
    optimizeDeps: {
      include: ['lucide-react']
    }
  }
});