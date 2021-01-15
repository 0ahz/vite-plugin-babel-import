# vite-plugin-babel-import

A vite import plugin for babel.

## install

```bash
npm i vite-plugin-babel-import -D
```

## Example

```js
import { Button } from 'vant';

        ↓ ↓ ↓ ↓ ↓ ↓

import Button from 'vant/es/button';
import 'vant/es/Button/index.css';
```

## Usage

```js
// vite.config.js

// ...
import vitePluginImport from 'vite-plugin-babel-import';
// ...
export default {
  // ...
  plugins: [
    // ...
    vitePluginImport([
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style(name) {
          return `vant/es/${name}/index.css`;
        },
      },
      {
        libraryName: 'element-plus',
        libraryDirectory: 'es',
        style(name) {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
      },
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style(name) {
          return `ant-design-vue/lib/${name}/style/index.css`;
        },
      },
    ]),
  ],
  // ...
};
```
