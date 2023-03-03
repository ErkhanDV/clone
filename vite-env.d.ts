/// <reference types="vite/client" />

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
}

declare module 'react-router-dom';

declare module 'node:url';

declare module '*.mp3';
