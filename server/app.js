const Koa = require("koa");
const path = require("path");
const router = require("./router.cjs");
const errorHandler = require("./middleware/errorHandler.cjs");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const views = require('koa-views')
const { accessLogger,logger} = require('./logger/index.cjs')
const { scheduleLogs } = require('./logger/clear.cjs')
const compress = require('koa-compress');
const options = { threshold: 700 };
const app = new Koa();
app.on('error', err => {
    logger.error(err);
});

app.use(accessLogger()); /* 日志 */
app.use(scheduleLogs)    /* 日志清除 */
app.use(errorHandler);   /* 错误处理 */
app.use(views(path.resolve(__dirname,"..","build"),{extension:'html'})) /* 动态模板 */
app.use(compress(options));
app.use(koaStatic(path.resolve(__dirname,"..","build"))); /* 静态资源 */
app.use(koaBody({
    multipart: true      /* 通过设置multipart可以允许读取formdata */
}));
app.use(router.routes()).use(router.allowedMethods()); /* 后端路由 */
app.listen(801, () => console.log(`server is running on port 801`));



