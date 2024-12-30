import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  server: {
    hmr: mode !== 'production',  // 프로덕션 환경에서만 HMR 비활성화
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg'
    })
  ],
  build: {
    outDir: '../nginx/.dist'
  },
  cacheDir: '.vite'
}));
