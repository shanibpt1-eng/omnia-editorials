import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@oci/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
      '@oci/database': path.resolve(__dirname, '../../packages/database/src/index.ts'),
      '@oci/integrations': path.resolve(__dirname, '../../packages/integrations/src/index.ts'),
    },
  },
});
