const Router = require("@koa/router");
const Route = require("./routes/index.cjs");
const router = new Router();
/* 登录鉴权接口 */
router.get("/verifyPic", Route.auth.verifyPic);
router.get("/getUserInfo", Route.auth.getUserInfo)
router.post("/login", Route.auth.login)
router.post("/register", Route.auth.register)
router.post("/profile/forgetPwd", Route.auth.findpwd)
router.post("/profile/activate", Route.auth.activate)
router.post("/profile/setNewPwd", Route.auth.setNewPwd)
router.post("/profile/resetPwd", Route.auth.resetPwd)

/* 学生接口 */
router.post("/notice/detail/student", Route.student.bulletin)
router.post("/student/myProfile", Route.student.detail)
router.all("/upload/:img", Route.student.uploadimg)
router.post("/student/add", Route.student.add)
router.post("/student/edit", Route.student.edit)

router.post("/studentProgram/my-application", Route.student.myapplication)
router.post("/org/detail", Route.student.orgdetail)
router.post("/program/detail", Route.student.prodetail)
router.post("/activity/detail", Route.student.activitydetail)
router.post("/program/delete", Route.student.deletepro)
router.post("/studentProgram/detail", Route.student.applydetail)
router.all("/downloadApplication", Route.student.downloadApplication)
router.all("/downloadAgreement", Route.student.downloadAgreement)
router.all("/uploadPdf/:pdf", Route.student.uploadpdf)
router.all("/studentProgram/uploadAgreement/student", Route.student.uploadAgreement)
router.post("/admin/bankinfo", Route.student.bankinfo)
router.post("/bank/edit", Route.student.bankedit)
router.post("/bank/add", Route.student.bankadd)

router.post("/studentProgram/apply", Route.student.apply)

/* 防止前端 history 路由 404 ,利用koa-view渲染动态模板*/
router.all("/*", async (ctx, next) => {
  await ctx.render('index.html');
});

module.exports = router;
