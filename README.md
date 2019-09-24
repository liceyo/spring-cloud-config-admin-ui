# Spring Cloud可视化配置中心前端项目

> Spring CLoud可视化配置中心分为前端和后端两个项目，前端提供可视化页面，后端提供功能接口。后端项目地址为[spring-cloud-config-admin-api](https://github.com/liceyo/spring-cloud-config-admin-api)

## 使用docker镜像

```shell script
#拉取镜像
docker pull liceyo/spring-cloud-config-admin-ui:1.0.0

#构建容器
docker run -e "CONFIG_ADMIN_API=[后端IP]:[后端Port]"  --name spring-cloud-config-admin-ui -p 9010:9010 -d liceyo/spring-cloud-config-admin-ui:1.0.0

# 也可以自己构建镜像，脚本在项目中已经写好，使用以下命令可以构建镜像：
docker build -t [自定义镜像名]:[tag] .
```

## 编译和构建项目

```shell script
# 克隆项目
git clone https://github.com/liceyo/spring-cloud-config-admin-ui

# 进入项目目录
cd spring-cloud-config-admin-ui

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run dev
```
> 开发环境修改后端接口地址在`vue.config.js`文件的`devServer`配置下的`proxy`内部修改`target`即可，使用了代理以解决跨域问题。

> 如果不使用docker镜像的方式来运行项目，需要将后端接口地址代理到前端项目下。

## 感谢

> 本项目基于[vue-admin-template](http://panjiachen.github.io/vue-admin-template)项目开发，感谢PanJiaChen提供优质的前端模板！


## License

[MIT](https://github.com/liceyo/spring-cloud-config-admin-ui/blob/master/LICENSE)

Copyright (c) 2019-present liceyo