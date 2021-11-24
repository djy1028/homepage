/**
* count 备份数
* formatTime 定时任务时间间隔
* 如需使用可修改日志匹配正则
*/
const schedule = require('node-schedule')
const fs = require('fs')
const path = require('path')
const scheduleLogs = async (ctx, next) => {
    let today = ['00','00','00'];
   
    // 定义定时任务, 根据设置的时间间隔做处理
    const rule = new schedule.RecurrenceRule();
    rule.hour = parseInt(today[0]);
    rule.minute = parseInt(today[1]);
    rule.second = parseInt(today[2]);
    
    schedule.scheduleJob(rule, () => {
      let files = fs.readdirSync(path.resolve('./logs'));
      files = files.filter(item => {
        if (item.match(/^[application|access]-d{4}-d{1,2}-d{1,2}.log/g)) {
          return true;
        }
      });
      // 包括今天的access.log & application.log
      if (files.length > 19) {
        let filesDateList = [];
        files.forEach(item => {
            const fileTime = item.match(/d{4}-d{1,2}-d{1,2}/g);
            fileTime && filesDateList.push(fileTime[0]);
        });
        filesDateList.sort((itemA, itemB) => new Date(itemB).getTime() - new Date(itemA).getTime())
        filesDateList.splice(0, 19);
        files.forEach(item => {
          const date = filesDateList.find(itemStr => item.match(itemStr) !== null);
          if (date) {
            const pathLink = path.resolve('./logs/' + item);
            fs.access(pathLink, function (error) {
              if (error) {
                throw error;
              } else {
                fs.unlink(pathLink, function (error) {
                  if (error) {
                    throw error;
                  }
                });
              }
            });
          }
        });
      }
    });

    await next()
}

module.exports = {
    scheduleLogs
}