# Keep-in-mind
随心记
## 前言
```
主要功能点
1.记录发表的内容（图片+文字）
```
## 源码说明
### 项目目录说明
```
.
|-- cloudfunctions                   // 存放云函数
|   |-- db                           // 云函数数据库调用
|   ...                       
|-- miniprogram                      // 小程序
|   |-- images                       // 图片资源
|   |-- pages                        // 页面目录
|       |-- addComment               // 添加内容
|   |-- app.js                       // 全局js
|   |-- app.json                     // 全局json
|   |-- app.wxss                     // 全局样式
|   |-- project.config.json          // 开发者工具个性化配置
|-- README.md                        // 项目说明 
|-- sitemap.json                     // sitemap 配置命令创建
.
```
### 技术难点与总结
```
1、云开发模式
```
### 原理简介
```
    云开发模式，将数据存储在云开发的数据库上，通过调用云函数接口来操作数据，适用于个人小程序开发。
```
### 立即体验
