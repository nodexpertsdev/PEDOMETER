module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "settings": {
    "import/core-modules": ["prop-types"],
  },
  "ecmaFeatures": {
    "classes": true,
  },
  "rules": {
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "global-require": "off",
  },
};