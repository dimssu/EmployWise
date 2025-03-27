declare module 'vite-plugin-eslint' {
  import type { Plugin } from 'vite'
  export default function eslint(options?: { failOnError?: boolean; include?: string[] }): Plugin
} 