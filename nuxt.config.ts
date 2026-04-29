export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    supabaseUrl: '',
    supabaseServiceKey: '',
    adminToken: '',
    public: {
      siteUrl: 'https://sala28.es',
      plausibleDomain: '',
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'sitemap', type: 'application/xml', title: 'Sitemap', href: '/sitemap.xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap'
        }
      ]
    }
  }
})
