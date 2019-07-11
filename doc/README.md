## 简介

使用electron + vue开发,模板基于[electron-vue](https://simulatedgreg.gitbooks.io/electron-vue/content/cn)

## 开发

```
# 克隆项目

# 进入项目目录
cd AngelExplore

# 安装依赖
npm install 

# 启动服务
npm run dev 
```

## 发布

```
# 构建
npm run build 
# 打包成功后会在build目录生成安装包
```

## 使用依赖介绍

```
"axios":请求统一在src/api目录
"better-scroll":  邮件模块列表滚动
"date-fns":  时间格式化
"emoji-mart-vue": emoji表情
"file-saver": 下载附件
"gitium.seed.js": 用户登录注册时用到
"js-md5": md5
"jszip": 邮件附件打包下载
"qrcodejs2": 钱包二维码
"vue-bus": 处理个别组件跨模块通知 在动态滚动加载等地方用到
"vue-i18n": 国际化
"wangeditor": 邮件内富文本

```

## 目录结构

由于业务代码只在src目录,文档内略去部分默认配置文件目录

```
|-- AngelExplore
    |-- package.json 项目依赖和electron配置
    |-- build electron打包文件夹
    |   |-- icons 应用ICON图标
    |-- doc                      
    |   |-- README.md            
    |-- src 
    |   |-- index.ejs 等同于index.html
    |   |-- main electron服务入口
    |   |   |-- index.dev.js
    |   |   |-- index.js electron配置
    |   |-- renderer
    |       |-- App.vue
    |       |-- main.js 
    |       |-- api
    |       |   |-- http.js 接口请求 通过this.api.xx()调用
    |       |   |-- index.js axios请求封装 
    |       |-- assets   
    |       |   |-- .gitkeep
    |       |   |-- img
    |       |       |-- 
    |       |-- commom
    |       |   |-- Badge  红色角标
    |       |   |   |-- index.vue 
    |       |   |-- Editor 邮件编辑富文本
    |       |   |   |-- index.vue
    |       |   |-- Scroll 邮件模块滚动
    |       |   |   |-- index.vue
    |       |   |-- Toast 全局提醒
    |       |       |-- Toast.vue
    |       |       |-- index.js
    |       |-- components
    |       |   |-- Avatar 全局头像
    |       |   |   |-- Avatar.vue
    |       |   |   |-- index.js
    |       |   |-- Cloud  云空间
    |       |   |   |-- AllFile.vue   所有购买空间列表
    |       |   |   |-- CloudBuy.vue  空间购买列表
    |       |   |   |-- CloudDetail.vue 空间购买列表详情
    |       |   |   |-- CloudPay.vue 空间购买付费
    |       |   |   |-- CloudRecords.vue 空间记录
    |       |   |   |-- CloudSell.vue  空间出售
    |       |   |   |-- PreviewImg.vue   空间预览图片
    |       |   |   |-- Progress.vue    
    |       |   |   |-- StorageDialog.vue  邮件存入云端选择框
    |       |   |   |-- Title.vue 标题
    |       |   |   |-- UserInfo.vue 云端右侧用户信息
    |       |   |   |-- cloudSpaceDoc.vue    空间所有文档类型文件
    |       |   |   |-- cloudSpaceImg.vue    空间所有图片类型文件
    |       |   |   |-- cloudSpaceLetter.vue    空间所有信件类型文件
    |       |   |   |-- cloudSpaceMusic.vue   空间所有音频类型文件
    |       |   |   |-- img
    |       |   |       |--
    |       |   |-- Collection  用户收藏
    |       |   |   |-- Btn.vue 菜单
    |       |   |   |-- Pages.vue 
    |       |   |   |-- PagesPreview.vue 收藏预览
    |       |   |   |-- index.vue
    |       |   |   |-- img  
    |       |   |       |-- 
    |       |   |-- Common
    |       |   |   |-- CheckMore.vue
    |       |   |   |-- SelectWidget.vue
    |       |   |   |-- img 
    |       |   |       |-- 
    |       |   |-- Emoji Emoji表情封装在动态和邮件模块引用
    |       |   |   |-- index.vue
    |       |   |-- Group  群组 
    |       |   |   |-- FDetail.vue
    |       |   |   |-- FList.vue
    |       |   |   |-- index.vue
    |       |   |   |-- img
    |       |   |       |-- 
    |       |   |-- Loading 全局Loading
    |       |   |   |-- index.vue
    |       |   |-- Login 登录
    |       |   |   |-- ForgetPwd.vue 找回密码
    |       |   |   |-- NodeSetting.vue 节点选择
    |       |   |   |-- img
    |       |   |       |-- 
    |       |   |-- Mail 邮件模块
    |       |   |   |-- Details.vue 邮件详情
    |       |   |   |-- EditMail.vue 编辑邮件
    |       |   |   |-- Mails.vue 邮件列表
    |       |   |   |-- Menu.vue  邮件左侧菜单
    |       |   |   |-- Modal.vue 邮件黑白名单选择弹窗
    |       |   |   |-- TopBar.vue 邮件上部菜单
    |       |   |   |-- index.vue
    |       |   |   |-- img     
    |       |   |       |-- 
    |       |   |       |-- edit
    |       |   |           |-- 
    |       |   |-- Main 主体
    |       |   |   |-- ButtonFirend.vue 请求/拒绝好友申请
    |       |   |   |-- ButtonGroup.vue 请求/拒绝群组
    |       |   |   |-- DynamicNotify.vue 动态提醒列表
    |       |   |   |-- DynamicPreview.vue 单条动态预览 IM和收藏动态用到
    |       |   |   |-- Feed.vue 动态
    |       |   |   |-- FeedAccessMenu.vue 发布动态权限菜单
    |       |   |   |-- FeedForward.vue 转发
    |       |   |   |-- FeedLikeList.vue 点赞列表
    |       |   |   |-- FeedModal.vue 发布动态选择好友
    |       |   |   |-- FeedNews.vue 动态展示
    |       |   |   |-- FeedNewsInputer.vue 发布动态输入
    |       |   |   |-- FeedPayLook.vue 付费
    |       |   |   |-- FeedPreview.vue 图片/视频预览
    |       |   |   |-- FeedReward.vue 打赏
    |       |   |   |-- FeedRewardList.vue 打赏列表
    |       |   |   |-- FeedSearch.vue 动态搜索
    |       |   |   |-- FeedTab.vue 发布动态
    |       |   |   |-- FeedUpload.vue 动态图片视频上传
    |       |   |   |-- FeedUserInfo.vue 其他用户主页头部信息
    |       |   |   |-- Head.vue 用户背景墙 头像
    |       |   |   |-- Recommend.vue 推荐列表
    |       |   |   |-- RecommendDetails.vue 推荐列表详情
    |       |   |   |-- RequestNotify.vue 用户请求顶部提醒
    |       |   |   |-- Requests.vue 请求好友/群组入口
    |       |   |   |-- Toast.vue 刷新/加载动态提示
    |       |   |   |-- index.vue 主体入口
    |       |   |   |-- img
    |       |   |       |-- 
    |       |   |-- Side 右侧边栏
    |       |   |   |-- Search.vue 搜索
    |       |   |   |-- index.vue 
    |       |   |   |-- img
    |       |   |       |-- 
    |       |   |-- SideButtom 左侧邮件按钮
    |       |   |   |-- index.vue
    |       |   |   |-- img     
    |       |   |       |-- 
    |       |   |-- TheNav  浏览器地址栏
    |       |   |   |-- Dynamic.vue 新动态列表
    |       |   |   |-- Question.vue 
    |       |   |   |-- Requests.vue 请求列表
    |       |   |   |-- Setting.vue 设置
    |       |   |   |-- Wallet.vue 钱包
    |       |   |   |-- index.vue 地址栏和右侧操作按钮
    |       |   |   |-- img  
    |       |   |       |-- 
    |       |   |-- TheTab  浏览器tab栏
    |       |   |   |-- Buttons.vue 最大化/最小化/关闭按钮
    |       |   |   |-- index.vue 
    |       |   |   |-- img  
    |       |   |       |-- 
    |       |   |-- User 用户
    |       |   |   |-- SelectWidget.vue 好友选择
    |       |   |   |-- UserForgetPwd.vue 
    |       |   |   |-- UserHelp.vue 帮助
    |       |   |   |-- UserLang.vue  切换语言
    |       |   |   |-- UserPrivacy.vue 隐私
    |       |   |   |-- UserSetting.vue  设置
    |       |   |   |-- img  
    |       |   |       |-- 
    |       |   |-- Wallet 钱包
    |       |   |   |-- AddProperty.vue    添加资产
    |       |   |   |-- Bill.vue    我的账单
    |       |   |   |-- CNYRecharge.vue    CNY充值
    |       |   |   |-- CurrencyDetail.vue    货币详情
    |       |   |   |-- DealDetail.vue     交易详情
    |       |   |   |-- GiveSet.vue    转账设置
    |       |   |   |-- MyMoneyCode.vue   我的收款码
    |       |   |   |-- MyWallet.vue    我的钱包
    |       |   |   |-- PersonalWorks.vue    个人作品
    |       |   |   |-- Recharge.vue    充值
    |       |   |   |-- Transfer.vue 转账   
    |       |   |   |-- img
    |       |   |       |--
    |       |   |-- WebIM 
    |       |       |-- AMap.js    地图
    |       |       |-- ChangeName.vue    修改名称
    |       |       |-- EmojiPanel.vue emoji
    |       |       |-- Forward.vue  转发
    |       |       |-- GetRed.vue    发送红包
    |       |       |-- GroupAdd.vue    添加群组
    |       |       |-- GroupCode.vue    群组二维码
    |       |       |-- GroupDetail.vue    群组详情
    |       |       |-- GroupSet.vue    群组设置
    |       |       |-- Map.vue 高德地图
    |       |       |-- MessageBox.vue    
    |       |       |-- Operation.vue    IM操作
    |       |       |-- Red.vue 红包
    |       |       |-- RedDetail.vue 红包详情
    |       |       |-- Transfer.vue 转账
    |       |       |-- TransferDetail.vue 转账详情
    |       |       |-- index.vue
    |       |       |-- img          
    |       |           |-- 
    |       |-- directive 指令
    |       |   |-- tip 鼠标放上弹出提示
    |       |       |-- index.css
    |       |       |-- index.js
    |       |-- lang i18n
    |       |   |-- en.js 英文
    |       |   |-- fn.js 初始化语言
    |       |   |-- index.js
    |       |   |-- tw.js 繁体
    |       |   |-- zh.js 中文
    |       |-- router 路由
    |       |   |-- index.js
    |       |-- store vuex
    |       |   |-- index.js
    |       |   |-- modules
    |       |       |-- Emoji.js
    |       |       |-- Feed.js 动态
    |       |       |-- Mail.js
    |       |       |-- Tabs.js 
    |       |       |-- Timer.js 用户动态定时
    |       |       |-- UserInfo.js 用户信息相关
    |       |       |-- Visible.js
    |       |       |-- Wallet.js
    |       |       |-- WebImQueue.js
    |       |       |-- index.js
    |       |-- view 页面
    |           |-- Cloud.vue 
    |           |-- CloudSpace.vue
    |           |-- Home.vue
    |           |-- Index.vue
    |           |-- Login.vue
    |           |-- UserSetting.vue
    |           |-- Wallet.vue
    |-- static
        |-- .gitkeep
```

