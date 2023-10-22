# Music App

🎶 Music App for sharing and playing your and other's music. Writen with Vue 3 options API.\
\
🌐 [Live Demo on Vercel](https://music-app-five-liart.vercel.app)

### Front:
- Vue 3
- Howler (Audio Playback)
- Tailwind CSS (Styling)
- Vue-i18n (Multi-lang support)
- Vee-Validate (Form validation)

### Back:
- Firebase (DB and Auth)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
