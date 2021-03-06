export default {
  target: 'static',
  ssr: 'false',
  head: {
    title: '映画MAP | お気に入りの映画館を見つけよう。',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' },
      { rel: 'stylesheet', href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.css' }
    ]
  },

  env: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    API_GATEWAY: process.env.API_GATEWAY,
    MAPBOX_STYLE_PATH: process.env.MAPBOX_STYLE_PATH
  },

  plugins: [
    '~plugins/vue-js-modal.js',
    '~/plugins/axios'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
  ],

  axios: {
    baseURL: 'http://localhost:3000',
    credentials: false,
  },

  proxy: {
    '/api/': 'http://api.example.com',
    '/api2/': 'http://api.another-website.com'
  },

  pwa: {
    manifest: {
      lang: 'ja'
    }
  },

  tailwindcss: {
    configPath: 'tailwind.config.js',
    exposeConfig: false,
  },

  googleAnalytics: {
    // id: process.env.GA_ID
  }
}
