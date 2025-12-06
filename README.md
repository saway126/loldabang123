# loldabang

## Riot API 키 설정 및 배포
1. 새로운 개발 키를 발급받는다. (Riot 개발자 포털)
2. PowerShell에서 helper 스크립트 실행:
   ```
   powershell -ExecutionPolicy Bypass -File scripts/update-riot-key.ps1
   ```
   - 프롬프트에 새 `RIOT_API_KEY` 입력
   - 자동으로 Vercel env `RIOT_API_KEY`(production) 추가 후 `vercel deploy` 실행
   - vercel CLI 로그인/프로젝트 링크가 되어 있어야 함
3. 로컬 .env에 반영하고 싶다면 `vercel env pull .env.local`을 추가 실행

## 로컬 폰트 (Beaufort)
원격 CORS 문제를 피하기 위해 Beaufort 폰트를 로컬 경로로 참조하도록 수정했습니다.

- 폰트 경로: `public/fonts/beaufortforlol-bold.woff2`, `public/fonts/beaufortforlol-regular.woff2`
- `src/index.css`에서 `@font-face`가 이 경로를 사용합니다.
- 실제 폰트 파일은 레포에 포함되어 있지 않으므로, 위 파일명을 맞춰 `public/fonts/`에 배치하세요.
- 파일이 없을 경우 자동으로 인터(Inter)/시스템 폰트로 폴백됩니다.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
