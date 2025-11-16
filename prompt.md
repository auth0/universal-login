I need a script that converts the resulting typedoc markdown content into mintlify format for the packages/auth0-acul-js package.

the react package has a working script that can be used as base, here: packages/auth0-acul-react/scripts/generate-mintlify-docs.js

The first step is to convert into mdx for mintlify, placing the new content in this folder: docs/customize/login-pages/advanced-customizations/reference/js-sdk, and adding frontmatter following the react example.

After this, we will work on improvements.

After each improvement to the script, delete the current result (docs/customize/login-pages/advanced-customizations/reference/js-sdk folder), and rerun the script so we can check the evolution, if its working as expected.
