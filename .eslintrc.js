module.exports = exports = {
  "root": true,
  "env": {
    node: true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:json/recommended-with-comments",
    "plugin:markdown/recommended",
    "@nuxtjs/eslint-config-typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  "parser": 'vue-eslint-parser',
  "rules": {
    "vue/multi-word-component-names": 'off'
  }
}