# 阿里巴巴前端练习生训练营

队名：拉玛西亚青训营

队员：谢炳辉，贺璐，俞伦端，高晓峰

## 项目简介

项目分为 4 个全屏滚动的屏，采用类似 `fullPage.js` 形式的实现

- 首屏：项目简介视频
- 第二屏：国内疫情大盘
- 第三屏：美国疫情大盘
- 第四屏：足坛疫情

## 技术栈
- vue2.x
- vuex
- typescript(tsx)
- axios
- element-ui（不是
- g2
- f2

## git提交参考规范
1. 个人新建单独分支进行开发
2. 每次提交前先拉取一遍，解决完冲突再提交
3. 提交规范
    1. commit格式为：git commit -m "[type]: [info]"，type可以分为下面几类
        - add：提交新功能
        - fix：修改bug
        - docs：只修改了文档
        - style：调整代码格式，没有修改代码逻辑（例如修改 tslint 提出的代码样式的问题）


## 相关命名规范
1. 接口命名以大写 I 开头，eg：IResponseData
2. 接口文件命名以 xxx.interface.ts 的结构
3. 工具类，方法命名以 xxx.utli.ts 的结构
4. 想到再补充

## 项目目录结构

```
.
├── README.md
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.tsx
│   ├── assets
│   ├── common
│   │   ├── ajax.ts // ajax 封装
│   │   ├── constants.ts    // 常量定义
│   │   └── error.ts    // 捕获 ajax 错误封装 
│   ├── components      // 组件
│   ├── interfaces    // 接口定义相关文件
│   │   ├── index.ts   // 统一出口
│   │   ├── state.interface.ts // 接口文件以 xxx.interface.ts 命名
│   │   └── storage.interface.ts
│   ├── main.ts       // 入口文件
│   ├── mock          // mock数据存放文件
│   ├── pages       // 四个屏代码存放
│   ├── router      // 路由
│   │   └── index.ts
│   ├── shims-tsx.d.ts
│   ├── shims-vue.d.ts
│   ├── store           // vuex
│   │   ├── actions.ts
│   │   ├── getters.ts
│   │   ├── index.ts
│   │   ├── mutationTypes.ts
│   │   └── mutations.ts
│   ├── utlis           // 常用方法，工具类等，文件命名格式最好为：xxx.utli.ts
│   │   └── storage.ts  // localStorage的封装
│   └── vars.scss       // 全局 scss 变量
├── tsconfig.json
├── tslint.json
└── yarn.lock
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
### 后端启动方式
```
cd server
npm run dev
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
