# 基础镜像
FROM node:latest
#FROM isrc.iscas.ac.cn/honghua/summer_front/summer_front_base

# 维护人邮箱
MAINTAINER hitredrose@163.com

# 安装 pm2 工具
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install pm2 -g

# docker与宿主机时间同步
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/shanghai" >> /etc/timezone

WORKDIR /usr/local/summer_offical_web/
# 将源代码拷贝至docker容器中
COPY . .

# 安装依赖并编译
RUN npm install

## 安装依赖并编译
RUN npm run build

# 启动项目
CMD pm2 start server/app.js && while true;do sleep 1;done