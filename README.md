# 指南

基于 `Ant Design Vue` 部分组件的封装和扩展，提供更适配桌面端的高阶组件

| 组件        | 名称         | 描述                                                                                                 |  相关文档                              |
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
pnpm add @antd-templater/library-3.x@^4.3.18
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

<details open>
<summary>TypeScript: `@antd-templater/library-3.x/globals`</summary>
<br/>

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "types": ["@antd-templater/library-3.x/globals"]
  }
}
```

</details>

<br/>

<details open>
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


