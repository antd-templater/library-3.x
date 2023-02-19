import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import vue from 'rollup-plugin-vue'

/**
 * Rollup Configuration
 */
export default defineConfig([
  {
    input: [
      'src/S-EditCell/input.tsx',
      'src/S-EditCell/select.tsx',
      'src/S-EditCell/textarea.tsx',
      'src/S-EditCell/tree-select.tsx',
      'src/S-EditCell/date-picker.tsx',
      'src/S-IconSelect/index.tsx',
      'src/S-Ellipsis/index.tsx',
      'src/S-Icon/index.tsx',
      'src/helper.ts',
      'src/index.ts'
    ],
    output: [
      {
        dir: 'dist',
        format: 'es',
        hoistTransitiveImports: false,
        entryFileNames: chunk => {
          const id = chunk.facadeModuleId
          const dir = id?.replace(/.+\/src\/(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$2')
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
          const dir = id?.replace(/.+\/src\/(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$2')
          return dir ? `${dir}/[name].cjs` : `[name].cjs`
        }
      }
    ],
    plugins: [
      alias({
        entries: [{
          find: '@',
          replacement: new URL('./src', import.meta.url).pathname
        }]
      }),
      nodeResolve(),
      commonjs(),
      typescript({
        check: false
      }),
      vue(),
      postcss(),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', 'tsx', '.vue']
      })
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
