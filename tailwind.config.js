module.exports = {
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textColor: ['focus', 'active']
    },
  },
  plugins: [
  ],
}