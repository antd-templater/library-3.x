import { defineConfig } from 'vite'
import typescript from 'rollup-plugin-typescript2'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  resolve: {
    alias: {
      '@/': new URL('./src/core/', import.meta.url).pathname
    }
  },

  build: {
    target: 'modules',
    outDir: 'dist',
    minify: false,
    sourcemap: false,
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: [
        'src/core/S-EditCell/input.tsx',
        'src/core/S-EditCell/select.tsx',
        'src/core/S-EditCell/textarea.tsx',
        'src/core/S-EditCell/tree-select.tsx',
        'src/core/S-EditCell/date-picker.tsx',
        'src/core/S-IconSelect/index.tsx',
        'src/core/S-Ellipsis/index.tsx',
        'src/core/S-Table/index.tsx',
        'src/core/S-Tree/index.tsx',
        'src/core/S-Form/index.tsx',
        'src/core/S-Icon/index.tsx',
        'src/core/helper.ts',
        'src/core/index.ts'
      ],
      output: [
        {
          dir: 'dist',
          format: 'es',
          hoistTransitiveImports: false,
          entryFileNames: chunk => {
            const id = chunk.facadeModuleId
            const dir = id?.replace(/.+\/src\/core\/(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$2')
            return dir ? `${dir}/[name].mjs` : `[name].mjs`
          }
        },
        {
          dir: 'dist',
          format: 'cjs',
          exports: 'named',
          hoistTransitiveImports: false,
          entryFileNames: chunk => {
            const id = chunk.facadeModuleId
            const dir = id?.replace(/.+\/src\/core\/(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$2')
            return dir ? `${dir}/[name].cjs` : `[name].cjs`
          }
        }
      ],
      external: [
        /\.less$/,
        /^vue(\/.+|$)/,
        /^dayjs(\/.+|$)/,
        /^vue-types(\/.+|$)/,
        /^ant-design-vue(\/.+|$)/,
        /^@ant-design\/icons-vue(\/.+|$)/
      ]
    },
    lib: { entry: 'src/core/index.ts' }
  },

  plugins: [
    copy({
      targets: [{
        dest: 'dist',
        src: 'src/core/**/*.less',
        rename: (n, e, fullPath) => fullPath.replace(/^src\/core\//, '')
      }]
    }),
    typescript({ check: false }), // first Vue and VueJsx
    VueJsx(),
    Vue()
  ]
})
