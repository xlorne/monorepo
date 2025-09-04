# pnpm with Rsbuild&Rslib build Monorepo 

## 综述

* 通过pnpm构建monorepo项目
* 通过rsbuild构建react项目
* 通过rslib构建依赖工程
* 统一配置支持@/别名
* 支持rstest单元测试
* 支持typescript

## 项目构建过程

1. 创建monorepo文件夹，然后通过`pnpm init` 创建`packages.json`

* 修改package.json的name
```
  "name": "@xlorne/root",
```
之所以叫做@xlorne是因为我的npmjs仓库的账号叫做xlorne，为了可以正常上传中心仓库设置了工程名称为@xlorne。

2. 指定node于pnpm工具及版本

* 在`package.json`下添加如下内容
```
  "packageManager": "pnpm@10.15.1",
  "engines": {
    "node": "20.x"
  },
```
* 创建`.npmrc`限制node版本为`package.json`中指定的版本
```
engine-strict = true
```

3. 创建`pnpm-workspace.yaml`并对应创建packages/apps目录
```
packages:
  - packages/*
  - apps/*
```

4.  创建utils的依赖仓库

``` shell
cd packages
npm create rslib@latest
```
执行过程如下:

```
◆  Create Rslib Project
│
◇  Project name or path
│  utils
│
◇  Select template
│  Node.js pure ESM package
│
◇  Select language
│  TypeScript
│
◇  Select development tools (Use <space> to select, <enter> to continue)
│  Rstest
│
◇  Select additional tools (Use <space> to select, <enter> to continue)
│  none
│
◇  Next steps ─────────────╮
│                          │
│  1. cd utils             │
│  2. git init (optional)  │
│  3. npm install          │
│  4. npm run dev          │
│                          │
├──────────────────────────╯
│
└  All set, happy coding!
```

5.  创建ui的组件依赖仓库
```shell
cd packages

npm create rslib@latest
```

执行过程如下:

```
◆  Create Rslib Project
│
◇  Project name or path
│  ui
│
◇  Select template
│  React
│
◇  Select language
│  TypeScript
│
◇  Select development tools (Use <space> to select, <enter> to continue)
│  Rstest
│
◇  Select additional tools (Use <space> to select, <enter> to continue)
│  none
│
◇  Next steps ─────────────╮
│                          │
│  1. cd ui              │
│  2. git init (optional)  │
│  3. npm install          │
│  4. npm run dev          │
│                          │
├──────────────────────────╯
│
└  All set, happy coding!
```

6. 在ui下配置@别名

为了添加别名的，先在src下创建了components文件夹，然后将Button组件代码转移过去

* 修改`tsconfig.json`
```
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
       "@/*": ["src/*"]
    }
  },
```
* 在`rslib.config.ts` 与 `rstest.config.ts`下增加alias
```
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
```

这样组件就可以直接通过@/导入 `export { Button } from '@/components/Button';`

* 为了支持tests下的@支持，需要在`tests/tsconfig.json`下增加如下配置
```
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["../src/*"]
    },
  }
```

7. 修改ui于utils的`package.json`的name

```
  "name": "@xlorne/ui",
```

```
  "name": "@xlorne/utils",
```

8. 创建demo的实例库

```shell
cd apps
npm create rsbuild@latest

```
执行过程如下:
```

◆  Create Rsbuild Project
│
◇  Project name or path
│  demo
│
◇  Select framework
│  React 19
│
◇  Select language
│  TypeScript
│
◇  Select additional tools (Use <space> to select, <enter> to continue)
│  none
│
◇  Next steps ─────────────╮
│                          │
│  1. cd demo             │
│  2. git init (optional)  │
│  3. npm install          │
│  4. npm run dev          │
│                          │
├──────────────────────────╯
│
└  All set, happy coding!
```

9. 修改demo的`package.json`name

```
"name": "@xlorne/demo",
```

10. 在demo中依赖ui和utils组件

```
pnpm add @xlorne/ui @xlorne/utils -F @xlorne/demo --workspace
```

11. 调整`package.json`

* 将所有共同依赖的版本归集到了root下
* 在root下增加scripts脚本
* 在ui于utils的`package.json`下增加标识信息，增加`push`指令
```
"description": "A UI Framework built with React and Typescript",
  "keywords": [
    "ui",
    "framework",
    "react",
    "typescript"
  ],
  "homepage": "https://github.com/xlorne/monorepo",
  "bugs": {
    "url": "https://github.com/xlorne/monorepo/issues"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/xlorne/monorepo.git"
  },
  "license": "Apache-2.0",
```

12. 发布ui组件到中心仓库
```
pnpm run -F @xlorne/ui push

pnpm run -F @xlorne/utils push
```

13. 运行demo测试

```
pnpm run dev
```

