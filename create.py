from pathlib import Path

# Define base path for the new package
base_path = Path("./packages/auth0-acul-react")

# Folder structure to create
folders = [
    "src/context",
    "src/hooks",
    "src/utils",
    "tests/hooks"
]

# Sample files with initial content
files = {
    "src/index.ts": """\
export * from 'auth0-acul-js';
export { Auth0Provider } from './context/Auth0Provider';
export { useLogin } from './hooks/useLogin';
export { useUniversalLoginContext } from './hooks/useUniversalLoginContext';
""",
    "src/context/Auth0Provider.tsx": """\
import React, { createContext, useContext } from 'react';

const UniversalLoginContext = createContext(window.universal_login_context);

export const Auth0Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UniversalLoginContext.Provider value={window.universal_login_context}>
      {children}
    </UniversalLoginContext.Provider>
  );
};

export const useUniversalLoginContext = () => useContext(UniversalLoginContext);
""",
    "src/hooks/useLogin.ts": """\
import { getLoginIdentifierScreen } from 'auth0-acul-js';

export function useLogin() {
  const screen = getLoginIdentifierScreen();
  return {
    title: screen.title,
    identifier: screen.identifier,
    onSubmit: screen.onSubmit,
  };
}
""",
    "tests/hooks/useLogin.test.tsx": """\
import { renderHook } from '@testing-library/react-hooks';
import { useLogin } from '../../src/hooks/useLogin';

test('should return login screen values', () => {
  const { result } = renderHook(() => useLogin());
  expect(result.current).toHaveProperty('title');
  expect(result.current).toHaveProperty('identifier');
});
""",
    "package.json": """\
{
  "name": "auth0-acul-react",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "dependencies": {
    "auth0-acul-js": "*"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "jest": "^29.0.0",
    "@testing-library/react-hooks": "^8.0.1",
    "@types/jest": "^29.0.0"
  }
}
""",
    "tsconfig.json": """\
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "lib": ["DOM", "ESNext"],
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true,
    "declaration": true,
    "outDir": "dist",
    "baseUrl": "./src"
  },
  "include": ["src"]
}
""",
    ".eslintrc.json": """\
{
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  "plugins": ["react", "@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "settings": {
    "react": { "version": "detect" }
  },
  "rules": {}
}
""",
    ".prettierrc": """\
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
""",
    "jest.config.ts": """\
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/tests/**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
""",
    "README.md": "# auth0-acul-react\n\nReact wrapper for `auth0-acul-js` to build custom Universal Login pages with React paradigms.\n"
}

# Create folders
for folder in folders:
    (base_path / folder).mkdir(parents=True, exist_ok=True)

# Write files
for path, content in files.items():
    file_path = base_path / path
    file_path.write_text(content)

"auth0-acul-react scaffold generated."