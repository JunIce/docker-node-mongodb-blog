## Docker 配合 nodejs 部署 一个Blog demo

### 运行

> docker-compose up

可以在命令行看到服务的运行日志，访问http://localhost:8002

### 停止并删除

命令行输入

> sh sh.sh


### Docker部分

1. Dockerfile书写的注意

Dockerfile 每一行书写的命令都会生成一个新的容器, Dockerfile 实行的是分层储存

WORKDIR 会更改之后容器的运行目录， 如果不指定，之后最好写绝对目录

2. docker-compose 联排 node服务 和 mongoodb 

3. mongoodb 的数据库在根目录的data 下面

指定app 的depends_on，会在mongo完全启动后再启动web服务

### App Blog部分

1. Koa为主要框架，配合koa-router,mongoose等实现简单的博客

2. 理解koa的中间件模式

3. 实现简单的用户注册登录功能
