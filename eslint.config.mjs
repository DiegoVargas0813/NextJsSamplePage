import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals, // Include the recommended rules for Next.js Core Web Vitals
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']), // Ignore build output and environment files
]);

export default eslintConfig;