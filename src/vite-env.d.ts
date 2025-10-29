/// <reference types="vite/client" />

// For CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For CSS
declare module '*.css' {
  const content: string;
  export default content;
}

// For images
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// For environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly VITE_API_BASE_URL?: string;
  }
}

// For Vite's import.meta.env
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
