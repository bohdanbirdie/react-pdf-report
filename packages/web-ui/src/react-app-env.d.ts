/// <reference types="react-scripts" />

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}