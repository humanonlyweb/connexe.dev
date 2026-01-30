export default defineNuxtConfig({
  compatibilityDate: 'latest',
  future: {
    compatibilityVersion: 5,
  },
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', 'evlog/nuxt'],

  app: {
    head: {
      title: 'Connexe - Connect content. Surface talent.',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Drop-in Vue & Nuxt widgets that recommend related articles and showcase developers right inside your site.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Connexe' },
        { property: 'og:title', content: 'Connexe - Connect content. Surface talent.' },
        {
          property: 'og:description',
          content:
            'Drop-in Vue & Nuxt widgets that recommend related articles and showcase developers right inside your site.',
        },
        { property: 'og:image', content: 'https://connexe.dev/og.png' },
        { property: 'og:url', content: 'https://connexe.dev' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Connexe - Connect content. Surface talent.' },
        {
          name: 'twitter:description',
          content:
            'Drop-in Vue & Nuxt widgets that recommend related articles and showcase developers right inside your site.',
        },
        { name: 'twitter:image', content: 'https://connexe.dev/og.png' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  evlog: {
    env: {
      service: 'connexe.com',
    },
    include: ['/api/**'],
  },
  css: ['~/assets/styles/app.scss'],
  experimental: {
    typescriptPlugin: true,
    viteEnvironmentApi: true,
    typedPages: true,
  },
  fonts: {
    processCSSVariables: true,
    defaults: {
      weights: [400, 500, 700, 900],
    },
    fontshare: {
      families: [{ name: 'Clash Grotesk' }],
    },
  },

  nitro: {
    preset: 'cloudflare-module',
    routeRules: {
      '/api/**': {
        cors: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
    },
  },

  runtimeConfig: {
    connexe: {
      ingestSecret: process.env.NUXT_CONNEXE_INGEST_SECRET || '',
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('connexe-'),
    },
  },
})
