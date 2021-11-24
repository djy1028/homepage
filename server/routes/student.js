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
    }
}