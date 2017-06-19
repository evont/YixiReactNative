

# YixiReactNative

[![Build Status](https://travis-ci.org/evont/YixiReactNative.svg?branch=master)](https://travis-ci.org/evont/YixiReactNative)

### Project Intro

​	使用React Native 进行一席 app 的仿制，已经使用react 全家桶进行了一席 web版仿制，所以项目直接使用已经做了代理的node 端进行数据获取，由于没有android 测试机，目前仅做了iOS 版本



### Tech Stack

- api：[一席 api 地址](https://github.com/jokermonn/-Api/blob/master/Yixi.md)

- react-navigation ： 官方推荐的路由导航器

- react-native-spinkit ： 很强大的loading 状态效果

- react-native-swiper ：实现主页滑屏效果

- react-native-drawer ： 实现对一席app 旋转斜切的抽屉效果

- react-native-parallax-view ： 实现滑动页面渐隐效果

- react-native-splash-screen ： 控制splash screen（闪屏）的淡出

- react-native-scrollable-tab-view ： 实现讲者及演讲的滚动切换标签



### Project Structure

```

├── __tests__               jest 测试用例
├── app                     项目代码目录
│   ├──...
│   ├── components          项目组件目录
│   ├── images              项目图片目录
│   ├── page                子页面存放目录
│   ├── api.js              项目api 获取函数
│   ├── global_style.js     项目通用样式
│   └── root.js             项目入口文件
├── node_modules            node模块目录
├── android                 Android 代码文件
├── ios                     iOS 代码文件
├── .travis.yml             Travis CI 配置文件 
├── .gitignore
├── package.json
├── README.md
└── yarn.lock		
```



### Gallery

![抽屉效果图](./capture/B6DC65F85A9951B244C100E2ED097C95.png)![首页渐隐效果](./capture/F07D11B7C19FC5193922DE9C4B5F21B2.png)

![演讲页面](./capture/7D2EBDDFCEE9A4A4B3BF3F70BC4CAF3A.png)![讲者页面](./capture/282A8C6AC9D23E2C6D510C64726CAB5C.png)

![细节页面](./capture/5A9F2F84F7C3C5705890D329CBB1C7F2.png)
