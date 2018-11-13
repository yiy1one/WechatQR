const router = require('koa-router')()
const checkToken = require('../utils/checkToken')
const getMsg = require('../utils/getMsg')
const QRModel = require('../db/QRModel')



//检测token，看信息是否来自微信服务器
router.all('/wechat',checkToken())

//微信消息示例
  // { 
  //   ToUserName: 'gh_1b4b021c6453',
  //   FromUserName: 'on8Ca1b8hSmEs5eG94JnKUsR6SOw',
  //   CreateTime: '1541430577',
  //   MsgType: 'event',
  //   Event: 'SCAN',
  //   EventKey: 'test',
  //   Ticket:'gQEE8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyRWw5NlU2djBlcWwxMDAwME0wNzEAAgQrVuBbAwQAAAAA' 
  // }

router.post('/wechat',async (ctx)=>{

  const msg = await getMsg(ctx)


  if(msg.EventKey.indexOf("qrscene_") > -1){
    msg.EventKey = msg.EventKey.replace(/qrscene_/, "")
  }

  let doc = (await QRModel.findOne({event:msg.EventKey}))
  let replyData
  if(!doc){ 
    replyData = ''
  }else{
    replyData = `
      <xml>
        <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
        <CreateTime>${new Date().getTime()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${doc.reply}]]></Content>
      </xml>
    `
    }
  ctx.body = replyData
})


module.exports = router
