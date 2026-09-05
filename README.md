# Birthday Seal

A template for a web-based birthday letter: a wax seal opens to reveal an animated scene and a personalized message. Built with React and Vite.

Fork this repo, edit the letter text and scene in `src/components`, and deploy it as a personal birthday gift.

## Getting started

```bash
npm install
npm run dev
```

## Tech

- React + Vite (HMR, Oxlint)
- `src/components/Seal.jsx` — the wax seal opening interaction
- `src/components/Scene.jsx` — the animated backdrop scene
- `src/components/Letter.jsx` — the letter content

## React Compiler

The React Compiler is not enabled in this template because of its impact on dev & build performance. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
