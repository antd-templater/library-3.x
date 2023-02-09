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
      'src/lib/S-Icon/index.tsx',
      'src/util/helper.ts',
      'src/util/base.ts',
      'src/index.ts'
    ],
    output: [
      {
        dir: 'dist',
        format: 'es',
        hoistTransitiveImports: false,
        entryFileNames: chunk => {
          const id = chunk.facadeModuleId
          const dir = id?.replace(/.+\/src\/(([^/]+)\/)?(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$2')
          const type = id?.replace(/.+\/src\/(([^/]+)\/)?(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$4')
          return dir && type ? `${dir}/${type}/[name].mjs` : dir ? `${dir}/[name].mjs` : `[name].mjs`
        },
        chunkFileNames: `vendor/[name]-[hash].mjs`
      },
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'named',
        hoistTransitiveImports: false,
        entryFileNames: chunk => {
          const id = chunk.facadeModuleId
          const dir = id?.replace(/.+\/src\/(([^/]+)\/)?(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$2')
          const type = id?.replace(/.+\/src\/(([^/]+)\/)?(([^./]+)\/)?[^./]+(\.vue|\.tsx|\.ts)/, '$4')
          return dir && type ? `${dir}/${type}/[name].cjs` : dir ? `${dir}/[name].cjs` : `[name].cjs`
        },
        chunkFileNames: `vendor/[name]-[hash].cjs`
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
      /^moment(\/.+|$)/,
      /^ant-design-vue(\/.+|$)/,
      /^@ant-design\/icons-vue/
    ]
  }
])
