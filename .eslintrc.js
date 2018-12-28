module.exports = {
  parser: "babel-eslint",
  env: {
    jasmine: true,
    browser: true,
    node: true
  },
  globals: {
    Generator: true,
    __DEV__: true,
    IntervalID: true,
    $Shape: true,
    $Values: true,
    jest: true,
    expect: true,
    describe: true,
    before: true,
    after: true,
    it: true
  },
  plugins: ["react-native", "jasmine", "flow-header"],
  extends: ["airbnb"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".ios.js",
          ".android.js",
          "index.js",
          "index.ios.js",
          "index.android.js"
        ]
      }
    }
  },
  rules: {
    "no-bitwise": "off",
    "no-prototype-builtins": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": 0,
    "react/require-default-props": "off", // moving to flow-type props
    "class-methods-use-this": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-constant-condition": ["error", { checkLoops: false }],
    "no-console": "off",
    "no-restricted-syntax": "off",
    "implicit-arrow-linebreak": 0,
    "react/no-unused-prop-types": "off",
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "flow-header/flow-header": 2,
    "no-mixed-operators": [
      "error",
      {
        groups: [
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ],
        allowSamePrecedence: false
      }
    ]
  }
};
