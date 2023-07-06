import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import VueJsx from '@vitejs/plugin-vue-jsx'
import alias from '@rollup/plugin-alias'
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
    plugins: [
      alias({
        entries: [{
          find: '@',
          replacement: new URL('./src/core', import.meta.url).pathname
        }]
      }),
      nodeResolve(),
      commonjs(),
      typescript({
        check: false,
        include: ['src/core/**/*.ts?(x)'],
        exclude: [
          'src/core/**/_.tsx',
          'src/core/**/*.d.ts',
          'src/core/**/def.*.tsx'
        ]
      }),
      Vue(),
      VueJsx(),
      postcss()
    ],
    external: [
      /^vue(\/.+|$)/,
      /^dayjs(\/.+|$)/,
      /^vue-types(\/.+|$)/,
      /^ant-design-vue(\/.+|$)/,
      /^@ant-design\/icons-vue(\/.+|$)/
    ]
  }
])
