import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import VueJsx from '@vitejs/plugin-vue-jsx'
import alias from '@rollup/plugin-alias'
import copy from 'rollup-plugin-copy'
import Vue from '@vitejs/plugin-vue'

/**
 * Rollup Configuration
 */
export default defineConfig([
  {
    input: [
      'src/core/S-EditCell/input.tsx',
      'src/core/S-EditCell/select.tsx',
      'src/core/S-EditCell/textarea.tsx',
      'src/core/S-EditCell/tree-select.tsx',
      'src/core/S-EditCell/select-icon.tsx',
      'src/core/S-EditCell/date-picker.tsx',
      'src/core/S-EditCell/auto-complete.tsx',
      'src/core/S-IconSelect/index.tsx',
      'src/core/S-ProLayout/index.tsx',
      'src/core/S-Ellipsis/index.tsx',
      'src/core/S-Table/index.tsx',
      'src/core/S-Tree/index.tsx',
      'src/core/S-Form/index.tsx',
      'src/core/S-Icon/index.tsx',
      'src/core/resolver.ts',
      'src/core/helper.ts',
      'src/core/index.ts',
    ],
    output: [
      {
        dir: 'dist',
        format: 'es',
        hoistTransitiveImports: false,
        chunkFileNames: `chunk-[name].mjs`,
        entryFileNames: chunk => {
          const id = chunk.facadeModuleId
          const dir = id?.replace(/.+\/src\/core\/(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$2')
          return dir ? `${dir}/[name].mjs` : `[name].mjs`
        },
      },
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'named',
        hoistTransitiveImports: false,
        chunkFileNames: `chunk-[name].cjs`,
        entryFileNames: chunk => {
          const id = chunk.facadeModuleId
          const dir = id?.replace(/.+\/src\/core\/(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$2')
          return dir ? `${dir}/[name].cjs` : `[name].cjs`
        },
        paths: id => {
          return id.replace('ant-design-vue/es/', 'ant-design-vue/lib/')
        },
      },
    ],
    plugins: [
      alias({
        entries: [{
          find: '@',
          replacement: new URL('./src/core', import.meta.url).pathname,
        }],
      }),
      commonjs(),
      nodeResolve(),
      typescript({
        check: false,
        include: ['src/core/**/*.ts?(x)'],
        exclude: [
          'src/core/**/_.tsx',
          'src/core/**/*.d.ts',
          'src/core/**/def.*.tsx',
        ],
      }),
      copy({
        targets: [{
          dest: ['dist'],
          src: ['src/typing/*'],
        }],
        expandDirectories: false,
      }),
      Vue(),
      VueJsx(),
      postcss(),
    ],
    external: [
      /^vue(\/.+|$)/,
      /^dayjs(\/.+|$)/,
      /^vue-types(\/.+|$)/,
      /^vue-router(\/.+|$)/,
      /^ant-design-vue(\/.+|$)/,
      /^@ant-design\/icons-vue(\/.+|$)/,
      /^@ctrl\/tinycolor(\/.+|$)/,
    ],
  },
])
