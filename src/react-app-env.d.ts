/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    //types of envs
    NODE_ENV: 'development' | 'production' | 'test';
    BASE_URL: string;
  }
}

declare module '*.svg' {
  const content: string;
  export default content;
}