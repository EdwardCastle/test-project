export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test_project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.styl',
    '~/assets/variables.scss',
    'bulma-badge/dist/css/bulma-badge.min.css',
    'bulma-pageloader/dist/css/bulma-pageloader.min.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/vue-screen', ssr: true }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    [
      'nuxt-fontawesome',
      {
        imports: [
          { set: '@fortawesome/free-solid-svg-icons', icons: ['fas'] },
          { set: '@fortawesome/free-brands-svg-icons', icons: ['fab'] }
        ]
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
