// .eslintrc.js (CommonJS, compatible ESLint v8)
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2022, // ES2022: app.js uses a top-level await to import the route files
    sourceType: 'module',
  },
  rules: {
    // Ajoute ici tes règles personnalisées si besoin
  },
};