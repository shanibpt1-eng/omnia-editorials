import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@oci/shared': path.resolve(__dirname, '../shared/src/index.ts'),
    },
  },
});
