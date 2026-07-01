/// <reference types="vite/client" />

// Vite's built-in types declare lowercase image extensions (e.g. "*.jpg").
// Some assets in this project use uppercase extensions (e.g. "DJI_0129.JPG"),
// which TypeScript treats as a different module specifier, so we declare them.
declare module '*.JPG' {
  const src: string;
  export default src;
}
declare module '*.JPEG' {
  const src: string;
  export default src;
}
declare module '*.PNG' {
  const src: string;
  export default src;
}
