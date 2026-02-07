import { defineConfig } from 'astro/config';
import cloudflarePages from '@astrojs/cloudflare-pages';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  adapter: cloudflarePages(),
  integrations: [tailwind(), react()],
  output: 'static',
  site: 'https://unbiasor.com',
  vite: {
    optimizeDeps: {
      include: ['lucide-react']
    }
  }
});