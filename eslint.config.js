import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { Linter } from "eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow apostrophes in text
      "react/no-unescaped-entities": "off",
      
      // Allow 'any' type in specific files
      "@typescript-eslint/no-explicit-any": ["error", {
        "ignoreRestArgs": true,
        "fixToUnknown": false
      }],
      
      // Make unused variables warnings instead of errors
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      
      // Keep the img element warning but don't make it an error
      "@next/next/no-img-element": "warn"
    },
    // Apply different rules to specific files
    overrides: [
      {
        files: ["src/app/login/page.tsx", "src/app/signup/page.tsx"],
        rules: {
          "@typescript-eslint/no-explicit-any": "off"
        }
      }
    ]
  },
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

/** @type {Linter.FlatConfig[]} */
export default eslintConfig;
