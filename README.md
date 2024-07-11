# 指南

基于 `Ant Design Vue` 部分组件的封装和扩展，提供更适配桌面端的高阶组件

| 组件        | 名称         | 描述                                                                                                 |                                |
| :---------- | :----------- | ---------------------------------------------------------------------------------------------------- | :----------------------------- |
| SIcon       | 图标组件     | 支持 Props 中 type 字段，动态渲染 @ant-design/icons-vue 中图标，也支持 iconfont 配置                 | [详情](https://antd-templater.github.io/docs/vue3.x/library/icon)        |
| SIconSelect | 图标选择器   | 图标 Selection 下拉框，默认使用 @ant-design/icons-vue 中图标作为选项，也支持自定义选项               | [详情](https://antd-templater.github.io/docs/vue3.x/library/icon_select) |
| SEditCell   | 单元格编辑框 | 表格 Cell 编辑框，支持 date-picker、input、select、textarea、tree-selec、s-icon-select 等组件适配    | [详情](https://antd-templater.github.io/docs/vue3.x/library/edit_cell)   |
| SEllipsis   | 文字省略提示 | 基于 ATooltip 的封装，支持实时计算内容是否超出父元素边界，是否需要文字省略和 Tooltip 提示            | [详情](https://antd-templater.github.io/docs/vue3.x/library/ellipsis)    |
| STable      | 表格组件     | 不是 ATable 的封装，支持 列拉伸/拖拽/属性配置，单元格合并/卡槽定义，Checkbox/Radio、内置分页等功能   | [详情](https://antd-templater.github.io/docs/vue3.x/library/table)       |
| SForm       | 表单组件     | 支持 Groups 配置渲染表单内容，也支持卡槽自定义组件。(Group: ARate、ARadio、AInput、ASwitch ...)      | [详情](https://antd-templater.github.io/docs/vue3.x/library/form)        |
| STree       | 树形组件     | 借助 ATree 的 checkStrictly="true" 特性，重新实现了 `勾选/选中/展开/异步加载` 等逻辑，并扩展了其 API | [详情](https://antd-templater.github.io/docs/vue3.x/library/tree)        |

<br/>
<br/>

## 安装

<details open>
<summary>适配支持 Ant Design Vue 4.x</summary>
<br/>

```bash
pnpm add @antd-templater/library-3.x@^4.3.16
pnpm add @antd-templater/eslint-config@^1.0.6
```

</details>

<br/>

<details>
<summary>适配支持 Ant Design Vue 3.x</summary>
<br/>

```bash
pnpm add @antd-templater/library-3.x@^3.0.2
```

</details>

<br/>
<br/>

## 如何使用

<details open>
<summary>全局注册使用</summary>
<br/>

```typescript
import App from "./App.vue"
import AntdComponentPlugin from "@antd-templater/library-3.x"

createApp(App)
  .use(AntdComponentPlugin)
  .mount("#app")
```

</details>

<br/>

<details>
<summary>自动按需导入使用</summary>
<br/>

```typescript
/* in vite.config.ts */

import { defineConfig } from 'vitest/config'
import { AntdLibraryResolver } from '@antd-templater/library-3.x/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoComponents from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  return {
    plugins: [
     AutoComponents({
        resolvers: [
          AntdLibraryResolver(),
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: 'less',
          }),
        ],
        include: [
          /\.[tj]sx?/,
          /\.vue\?vue/,
          /\.vue$/,
        ],
      }),
      AutoImport({
        resolvers: [
          AntdLibraryResolver(),
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        dts: true,
      }),
      VueJsx(),
      Vue(),
    ],
  }
})
```

</details>


<br/>
<br/>

## TypeScript 和 ESLint 支持

<details>
<summary>TypeScript: `@antd-templater/library-3.x/globals`</summary>
<br/>

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "types": ["@antd-templater/library-3.x/globals"] // [!code highlight]
  }
}
```

</details>

<br/>

<details>
<summary>ESlint: `@antd-templater/eslint-config`</summary>
<br/>

```typescript
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import pluginVue from "eslint-plugin-vue";
import stylistic from "@stylistic/eslint-plugin";
import templater from "@antd-templater/eslint-config"; // [!code highlight]

const flatArray = (options) => {
  return !Array.isArray(options) ? [options] : options;
};

export default tseslint.config({
  extends: [
    ...flatArray(eslint.configs.recommended),
    ...flatArray(tseslint.configs.recommended),
    ...flatArray(stylistic.configs["recommended-flat"]),
    ...flatArray(pluginVue.configs["flat/recommended"]),
    ...flatArray(templater.configs["flat/recommended"]), // [!code highlight]
  ],
});
```

</details>

<br/>
<br/>

## 浏览器兼容性

<table>
  <thead>
    <tr>
      <th style="text-align: center;"> 
        <img src="https://antd-templater.github.io/docs/vue3.x/ie.png" alt="IE" width="24px" height="24px" style="display: block; margin: 3px auto; vertical-align: middle;" />
        <span style="vertical-align: sub;">IE</span>
      </th>
      <th style="text-align: center;">
        <img src="https://antd-templater.github.io/docs/vue3.x/edge.png" alt="Edge" width="24px" height="24px" style="display: block; margin: 3px auto; vertical-align: middle;" />
        <span style="vertical-align: sub;">Edge</span>
      </th>
      <th style="text-align: center;">
        <img src="https://antd-templater.github.io/docs/vue3.x/firefox.png" alt="Firefox" width="24px" height="24px" style="display: block; margin: 3px auto; vertical-align: middle;" />
        <span style="vertical-align: sub;">Firefox</span>
      </th>
      <th style="text-align: center;">
        <img src="https://antd-templater.github.io/docs/vue3.x/chrome.png" alt="Chrome" width="24px" height="24px" style="display: block; margin: 3px auto; vertical-align: middle;" />
        <span style="vertical-align: sub;">Chrome</span>
      </th>
      <th style="text-align: center;">
        <img src="https://antd-templater.github.io/docs/vue3.x/safari.png" alt="Safari" width="24px" height="24px" style="display: block; margin: 3px auto; vertical-align: middle;" />
        <span style="vertical-align: sub;">Safari</span>
      </th>
      <th style="text-align: center;">
        <img src="https://antd-templater.github.io/docs/vue3.x/electron.png" alt="Electron" width="24px" height="24px" style="display: block; margin: 3px auto; vertical-align: middle;" />
        <span style="vertical-align: sub;">Electron</span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">
        <span style="vertical-align: middle;">不支持 </span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="#f0624d" class="icon" style="display: inline-block; vertical-align: middle;">
          <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
        </svg>
      </td>
      <td style="text-align: center;">
        <span style="vertical-align: middle;">支持 </span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="#60b13c" class="icon" style="display: inline-block; vertical-align: middle;">
          <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
        </svg>
      </td>
      <td style="text-align: center;">
        <span style="vertical-align: middle;">支持 </span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="#60b13c" class="icon" style="display: inline-block; vertical-align: middle;">
          <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
        </svg>
      </td>
      <td style="text-align: center;">
        <span style="vertical-align: middle;">支持 </span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="#60b13c" class="icon" style="display: inline-block; vertical-align: middle;">
          <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
        </svg>
      </td>
      <td style="text-align: center;">
        <span style="vertical-align: middle;">支持 </span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="#60b13c" class="icon" style="display: inline-block; vertical-align: middle;">
          <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
        </svg>
      </td>
      <td style="text-align: center;">
        <span style="vertical-align: middle;">支持 </span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="#60b13c" class="icon" style="display: inline-block; vertical-align: middle;">
          <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
        </svg>
      </td>
    </tr>
  </tbody>
</table>
