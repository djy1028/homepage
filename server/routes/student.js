const request = require('./request.cjs')
const Qs = require('qs')
const path = require('path')
const fse = require('fs-extra')
const fs = require('fs')
const formData = require('form-data')
const requ = require('request')
module.exports = {
    bulletin: async (ctx, next) => {
        const response = await request({
            url: `/system/notice/detail/student`,
            headers: { Authorization: ctx.request.header.authorization }
        })
        ctx.body = JSON.stringify(response.data)
    },
    detail: async (ctx, next) => {
        const response = await request({
            url: `/system/student/myProfile`,
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.res) {
            response.data.res.cardFrontUrl && requ(response.data.res.cardFrontUrl).pipe(fs.createWriteStream(path.join(__dirname, '../upload', 'cardFrontUrl.png')))
            response.data.res.cardBackUrl && requ(response.data.res.cardBackUrl).pipe(fs.createWriteStream(path.join(__dirname, '../upload', 'cardBackUrl.png')))
            requ(response.data.res.studentCardUrl).pipe(fs.createWriteStream(path.join(__dirname, '../upload', 'studentCardUrl.png')))
            response.data.res.cardFrontUrl = [{
                uid: 2,
                status: 'done',
                url: response.data.res.cardFrontUrl,
                name: 'cardFrontUrl.png'
            }]
            response.data.res.cardBackUrl = [{
                uid: 3,
                status: 'done',
                url: response.data.res.cardBackUrl,
                name: 'cardBackUrl.png'
            }]
            response.data.res.studentCardUrl = [{
                uid: 4,
                status: 'done',
                url: response.data.res.studentCardUrl,
                name: 'studentCardUrl.png'
            }]
            ctx.body = JSON.stringify(response.data.res)
        }
        ctx.body = JSON.stringify(response.data.res)


    },
    uploadimg: async (ctx, next) => {
        fs.unlinkSync(path.join(__dirname, '../upload', `${ctx.params.img}.png`))
        const { name, path: filePath, size, type } = ctx.request.files.file
        const dest = path.join(__dirname, '../upload', `${ctx.params.img}.png`) // 目标目录，没有没有这个文件夹会自动创建
        await fse.move(filePath, dest) // 移动文件
        ctx.body = {
            name, // 文件名称
            filePath, // 临时路径
            size, // 文件大小
            type // 文件类型
        }
    },
    add: async (ctx, next) => {
        let formdata = new formData()
        const { name, phone, school, cardNumber, education, internship, program, openSoource, skill, cardBackUrl, cardFrontUrl } = ctx.request.body
        name && formdata.append('name', name)
        phone && formdata.append('phone', phone)
        school && formdata.append('school', school)
        cardNumber ? formdata.append('cardNumber', cardNumber) : formdata.append('cardNumber', '')
        education ? formdata.append('education', education) : formdata.append('education', '')
        internship ? formdata.append('internship', internship) : formdata.append('internship', '')
        program ? formdata.append('program', program) : formdata.append('program', '')
        openSoource ? formdata.append('openSoource', openSoource) : formdata.append('openSoource', '')
        skill ? formdata.append('skill', skill) : formdata.append('skill', '')
        cardFrontUrl ? formdata.append('file1', fs.createReadStream(path.join(__dirname, '../upload', 'cardFrontUrl.png'))) : formdata.append('cardFrontUrl', '')
        cardBackUrl ? formdata.append('file2', fs.createReadStream(path.join(__dirname, '../upload', 'cardBackUrl.png'))) : formdata.append('cardBackUrl', '')
        formdata.append('file3', fs.createReadStream(path.join(__dirname, '../upload', 'studentCardUrl.png')))
        const response = await request({
            data: formdata,
            url: `/system/student/add`,
            method: 'post',
            headers: {
                Authorization: ctx.request.header.authorization,
                ...formdata.getHeaders()
            }
        })

        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        ctx.body = JSON.stringify(response.data)
    },
    edit: async (ctx, next) => {
        let formdata = new formData()
        const { name, phone, school, cardNumber, education, internship, program, openSoource, skill, studentId, cardBackUrl, cardFrontUrl } = ctx.request.body
        studentId && formdata.append('studentId', studentId)
        name && formdata.append('name', name)
        phone && formdata.append('phone', phone)
        school && formdata.append('school', school)
        cardNumber ? formdata.append('cardNumber', cardNumber) : formdata.append('cardNumber', '')
        education ? formdata.append('education', education) : formdata.append('education', '')
        internship ? formdata.append('internship', internship) : formdata.append('internship', '')
        program ? formdata.append('program', program) : formdata.append('program', '')
        openSoource ? formdata.append('openSoource', openSoource) : formdata.append('openSoource', '')
        skill ? formdata.append('skill', skill) : formdata.append('skill', '')
        cardFrontUrl ? formdata.append('file1', fs.createReadStream(path.join(__dirname, '../upload', 'cardFrontUrl.png'))) : formdata.append('cardFrontUrl', '')
        cardBackUrl ? formdata.append('file2', fs.createReadStream(path.join(__dirname, '../upload', 'cardBackUrl.png'))) : formdata.append('cardBackUrl', '')
        formdata.append('file3', fs.createReadStream(path.join(__dirname, '../upload', 'studentCardUrl.png')))
        const response = await request({
            data: formdata,
            url: `/system/student/edit`,
            method: 'post',
            headers: {
                Authorization: ctx.request.header.authorization,
                ...formdata.getHeaders()
            }
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        ctx.body = JSON.stringify(response.data)
    },
    myapplication: async (ctx, next) => {
        const { pageNum, pageSize } = ctx.request.body
        ctx.request.body.pageNum = pageNum ? pageNum : '1'
        ctx.request.body.pageSize = pageSize ? pageSize : '10'
        if (ctx.request.body.pageSize === '50001') {
            ctx.request.body.pageNum = ''
            ctx.request.body.pageSize = '',
                ctx.request.body.status = 1
        }
        const response = await request({
            data: Qs.stringify({ ...ctx.request.body }),
            url: '/system/studentProgram/my-application',
            method: 'post',
            headers: { Authorization: ctx.request.header.authorization }
        })
        response.data.code === 200 ? response.data.rows = response.data.rows.map(item => ({ ...item, ...{ key: item.orgProgramId } })) : ctx.response.status = response.data.code
        ctx.body = JSON.stringify(response.data)
    },
    orgdetail: async (ctx, next) => {
        const { orgId } = ctx.request.body
        const response = await request({
            url: `/system/org/intro/${Number(orgId)}`,
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.code === 200) {
            const temparea = response.data.suOrg.areaTag && response.data.suOrg.areaTag.split(',')
            const temptech = response.data.suOrg.techTag && response.data.suOrg.techTag.split(',')
            const tempareaname = response.data.areaTags && response.data.areaTags.join(', ')
            const temptechname = response.data.techTags && response.data.techTags.join(', ')
            requ(response.data.suOrg.orgLogo).pipe(fs.createWriteStream(path.join(__dirname, '../upload', 'logo.png')))
            response.data.suOrg.orgLogo = [{
                uid: 1,
                status: 'done',
                url: response.data.suOrg.orgLogo,
                name: 'logo.png'
            }]
            response.data.suOrg.areaTag = temparea && temparea.map(item => parseInt(item))
            response.data.suOrg.techTag = temptech && temptech.map(item => parseInt(item))
            response.data.suOrg.areaTagName = tempareaname ? tempareaname : null
            response.data.suOrg.techTagName = temptechname ? temptechname : null
            ctx.body = JSON.stringify(response.data.suOrg)
        }
        else {
            ctx.response.status = response.data.code
            ctx.body = JSON.stringify(response.data)
        }
    },
    prodetail: async (ctx, next) => {
        const { proId } = ctx.request.body
        const response = await request({
            url: `/system/program/detail/${proId}`,
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.code === 200) {
            const temparea = response.data.suOrgProgram.areaTag && response.data.suOrgProgram.areaTag.split(',')
            const temptech = response.data.suOrgProgram.techTag && response.data.suOrgProgram.techTag.split(',')
            response.data.suOrgProgram.areaTag = temparea && temparea.map(item => parseInt(item))
            response.data.suOrgProgram.techTag = temptech && temptech?.map(item => parseInt(item))
            response.data.suOrgProgram.teachers = response.data.teachers
            const teacherres = await request({
                url: `/system/org/teachers`,
                headers: { Authorization: ctx.request.header.authorization },
                data: Qs.stringify({ id: response.data.suOrgProgram.orgId }),
                method: 'post'
            })
            teacherres.data.code === 200 ? teacherres.data.rows = teacherres.data.rows && teacherres.data.rows.map(item => ({ ...item, ...{ key: item.userId } })) : ctx.response.status = teacherres.data.code
            response.data.suOrgProgram.teacherlist = teacherres.data.rows
            ctx.body = JSON.stringify(response.data.suOrgProgram)
        }
        else {
            ctx.response.status = response.data.code
            ctx.body = JSON.stringify(response.data)
        }
    },
    activitydetail: async (ctx, next) => {
        const { activityId } = ctx.request.body
        const response = await request({
            url: `/system/activity/detail/${activityId}`,
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        response.data.code === 200 ? ctx.body = JSON.stringify(response.data.suActivity) : ctx.body = JSON.stringify(response.data)
    },
    deletepro: async (ctx, next) => {
        const { ids } = ctx.request.body
        const response = await request({
            url: `/system/studentProgram/remove/${ids}`,
            method: 'delete',
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        ctx.body = JSON.stringify(response.data)
    },
    applydetail: async (ctx, next) => {
        const { id } = ctx.request.body
        const response = await request({
            url: `/system/studentProgram/detail/${id}`,
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }


        response.data.code === 200 ? ctx.body = JSON.stringify({ ...response.data.activity, ...response.data.suStudentProgram }) : ctx.body = JSON.stringify(response.data)
    },
    downloadApplication: async (ctx, next) => {
        const { id, phase } = ctx.request.body
        const response = await request({
            url: `/system/studentProgram/downloadApplication/${id}/${phase}`,
            headers: {
                Authorization: ctx.request.header.authorization
            },
            responseType: 'arraybuffer'
        })
        ctx.set({
            'Content-Type': response.headers['content-type'], //告诉浏览器这是一个二进制文件  
            'Content-Disposition': response.headers['content-disposition'], //告诉浏览器这是一个需要下载的文件  
        });
        ctx.body = response.data
    },
    downloadTemplate: async (ctx, next) => {
        const response = await request({
            url: `/summer/template/5`,
            headers: {
                Authorization: ctx.request.header.authorization
            },
            responseType: 'arraybuffer'
        })
        ctx.set({
            'Content-Type': response.headers['content-type'], //告诉浏览器这是一个二进制文件  
            'Content-Disposition': response.headers['content-disposition'], //告诉浏览器这是一个需要下载的文件  
        });
        ctx.body = response.data
    },

    downloadAgreement: async (ctx, next) => {
        const { id } = ctx.request.body
        const response = await request({
            url: `/summer/template/${id}/`,
            headers: {
                Authorization: ctx.request.header.authorization
            },
            responseType: 'arraybuffer'
        })
        ctx.set({
            'Content-Type': response.headers['content-type'], //告诉浏览器这是一个二进制文件  
            'Content-Disposition': response.headers['content-disposition'], //告诉浏览器这是一个需要下载的文件  
        });
        ctx.body = response.data
    },
    uploadAgreement: async (ctx, next) => {
        const { id } = ctx.request.body
        let formdata = new formData()
        const name = decodeURI(ctx.cookies.get('STUAGREEMENT'))
        if (!fs.existsSync(path.join(__dirname, '../upload', name))) {
            ctx.body = JSON.stringify({ code: -1, message: '请选择pdf文件' })
        }
        else {
            if (id === -1 && fs.existsSync(path.join(__dirname, '../upload', name))) {
                fs.unlinkSync(path.join(__dirname, '../upload', name))
                ctx.body = JSON.stringify({ code: 200, message: '操作成功' })
            }
            else {
                id ? formdata.append('id', id) : formdata.append('id', '')
                formdata.append('file1', fs.createReadStream(path.join(__dirname, '../upload', name)))
                const response = await request({
                    data: formdata,
                    url: '/system/studentProgram/uploadAgreement',
                    headers: {
                        Authorization: ctx.request.header.authorization,
                        ...formdata.getHeaders()
                    },
                    method: 'post'
                })
                ctx.cookies.set('STUAGREEMENT', undefined)
                fs.unlinkSync(path.join(__dirname, '../upload', name))
                ctx.body = JSON.stringify(response.data)
            }
        }
    },
    uploadpdf: async (ctx, next) => {
        const { name, path: filePath, size, type } = ctx.request.files.file
        if (fs.existsSync(path.join(__dirname, '../upload', name))) {
            fs.unlinkSync(path.join(__dirname, '../upload', name))
        }
        const dest = path.join(__dirname, '../upload', name) // 目标目录，没有没有这个文件夹会自动创建
        await fse.move(filePath, dest) // 移动文件
        ctx.cookies.set('STUAGREEMENT', encodeURI(name))
        ctx.body = {
            name, // 文件名称
            filePath, // 临时路径
            size, // 文件大小
            type // 文件类型
        }
    },
    uploadreport: async (ctx, next) => {
        const { name, path: filePath, size, type } = ctx.request.files.file
        if (fs.existsSync(path.join(__dirname, '../upload', name))) {
            fs.unlinkSync(path.join(__dirname, '../upload', name))
        }
        const dest = path.join(__dirname, '../upload', name) // 目标目录，没有没有这个文件夹会自动创建
        await fse.move(filePath, dest) // 移动文件
        console.log(ctx.params.report)
        ctx.params.report === 'studentReportEnd' ? ctx.cookies.set('ENDNAME', encodeURI(name)) : ctx.cookies.set('MIDNAME', encodeURI(name))
        ctx.body = {
            name, // 文件名称
            filePath, // 临时路径
            size, // 文件大小
            type // 文件类型
        }
    },
    uploadzip: async (ctx, next) => {
        const { name, path: filePath, size, type } = ctx.request.files.file
        if (fs.existsSync(path.join(__dirname, '../upload', name))) {
            fs.unlinkSync(path.join(__dirname, '../upload', name))
        }
        const dest = path.join(__dirname, '../upload', name) // 目标目录，没有没有这个文件夹会自动创建
        await fse.move(filePath, dest) // 移动文件
        ctx.cookies.set('APPLYNAME', encodeURI(name))
        ctx.body = {
            name, // 文件名称
            filePath, // 临时路径
            size, // 文件大小
            type // 文件类型
        }
    },
    bankinfo: async (ctx, next) => {
        const response = await request({
            url: `/system/bank/my-bank`,
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        response.data.code === 200 && response.data.bank ? response.data.rows = [response.data.bank].map(item => ({ ...item, ...{ key: item.userId } })) : response.data.rows = []
        ctx.body = JSON.stringify(response.data)
    },
    bankedit: async (ctx, next) => {
        const response = await request({
            data: Qs.stringify({ ...ctx.request.body }),
            url: '/system/bank/edit',
            method: 'post',
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        ctx.body = JSON.stringify(response.data)
    },
    bankadd: async (ctx, next) => {
        const response = await request({
            data: Qs.stringify({ ...ctx.request.body }),
            url: '/system/bank/add',
            method: 'post',
            headers: { Authorization: ctx.request.header.authorization }
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        ctx.body = JSON.stringify(response.data)
    },
    apply: async (ctx, next) => {
        const response = await request({
            data: Qs.stringify({ ...ctx.request.body }),
            url: `/system/studentProgram`,
            headers: { Authorization: ctx.request.header.authorization },
            method: 'put'
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        ctx.body = JSON.stringify(response.data)
    },
    isSignupAvailable: async (ctx, next) => {
        const response = await request({
            url: `/public/isSignupAvailable`,
            headers: { Authorization: ctx.request.header.authorization },
            method: 'get'
        })
        if (response.data.code !== 200) {
            ctx.response.status = response.data.code
        }
        ctx.body = JSON.stringify(response.data)
    },
    programedit: async (ctx, next) => {
        const { id, phase } = ctx.request.body
        let formdata = new formData()
        let name
        switch (phase) {
            case 'apply':
                name = decodeURI(ctx.cookies.get('APPLYNAME'))
                if (!name) {
                    ctx.body = JSON.stringify({ code: -1, message: '请选择文件后提交！' })
                }
                break
            case 'mid':
                name = decodeURI(ctx.cookies.get('MIDNAME'))
                if (!name) {
                    ctx.body = JSON.stringify({ code: -1, message: '请选择文件后提交！' })
                }
                break
            case 'end':
                name = decodeURI(ctx.cookies.get('ENDNAME'))
                if (!name) {
                    ctx.body = JSON.stringify({ code: -1, message: '请选择文件后提交！' })
                }
                break
        }
        if (!fs.existsSync(path.join(__dirname, '../upload', name))) {
            ctx.body = JSON.stringify({ code: -1, message: '请选择文件后提交！' })
        }
        else {
            if (id === -1 && fs.existsSync(path.join(__dirname, '../upload', name))) {
                fs.unlinkSync(path.join(__dirname, '../upload', name))
                ctx.body = JSON.stringify({ code: 200, message: '操作成功' })
            }
            else {
                id ? formdata.append('id', id) : formdata.append('id', '')
                formdata.append('file1', fs.createReadStream(path.join(__dirname, '../upload', name)))
                const response = await request({
                    data: formdata,
                    url: `/system/studentProgram/edit/${phase}`,
                    headers: {
                        Authorization: ctx.request.header.authorization,
                        ...formdata.getHeaders()
                    },
                    method: 'post'
                })
                ctx.cookies.set('MIDNAME', undefined)
                ctx.cookies.set('ENDNAME', undefined)
                ctx.cookies.set('APPLYNAME', undefined)
                fs.unlinkSync(path.join(__dirname, '../upload', name))
                ctx.body = JSON.stringify(response.data)

            }
        }
    },
    updatePriority: async (ctx, next) => {
        const response = await request({
            url: '/system/studentProgram/updatePriority',
            headers: { Authorization: ctx.request.header.authorization },
            data: ctx.request.body,
            method: 'post'
        })
        ctx.body = JSON.stringify(response.data)
    },
    activityList: async (ctx, next) => {
        const { pageNum, pageSize, isAsc, orderByColumn } = ctx.request.body
        ctx.request.body.pageNum = pageNum ? pageNum : '1'
        ctx.request.body.pageSize = pageSize ? pageSize : '10'
        ctx.request.body.isAsc = isAsc ? isAsc : 'desc'
        ctx.request.body.orderByColumn = orderByColumn ? orderByColumn : 'createTime'
        const response = await request({
            data: Qs.stringify({ ...ctx.request.body }),
            url: '/system/activity/list',
            method: 'post',
            headers: { Authorization: ctx.request.header.authorization }
        })
        response.data.code === 200 ? response.data.rows = response.data.rows.map(item => ({ ...item, ...{ key: item.activityId } })) : ctx.response.status = response.data.code
        ctx.body = JSON.stringify(response.data)
    },
    canSetPriority: async (ctx, next) => {
        const response = await request({
            url: '/system/studentProgram/commitStatus',
            headers: { Authorization: ctx.request.header.authorization },
            data: Qs.stringify({ ...ctx.request.body }),
            method: 'post'
        })
        ctx.body = JSON.stringify(response.data)
    },
    toSetPriority: async (ctx, next) => {
        ctx.request.body.pageNum = ''
        ctx.request.body.pageSize = '',
            ctx.request.body.maxStatus = 2
        ctx.request.body.minStatus = 1
        const response = await request({
            data: Qs.stringify({ ...ctx.request.body }),
            url: '/system/studentProgram/toSetPriority',
            method: 'post',
            headers: { Authorization: ctx.request.header.authorization }
        })
        response.data.code === 200 ? response.data.rows = response.data.rows.map(item => ({ ...item, ...{ key: item.orgProgramId } })) : ctx.response.status = response.data.code
        ctx.body = JSON.stringify(response.data)
    },
}