const router = require('koa-router')()
const QRModel = require('../db/QRModel')
const axios = require('axios')
const { getAccessToken } = require('../utils/getAccessToken')
const getQRToBase64 = require('./../utils/getQRToBase64')


router.prefix('/reply')

router.post('/config',async (ctx,next) => {

  const { event, reply } = ctx.request.body.params

  const accessToken = (await getAccessToken()).access_token

  const url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${accessToken}`
  ticket = (await axios({
    method:"post",
    url:url,
    data:{
      "action_name": "QR_LIMIT_STR_SCENE", 
      "action_info": {
        "scene": {
          "scene_str": event
        }
      }
    }
  })).data.ticket

  const img = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+ticket
 
  base64 = await getQRToBase64(img)

  let QR = new QRModel({
    event :event,       
    reply: reply,            
    base64: base64
  })


  let result = await QR.save()

  if(result){
    ctx.body = {
      code: 0,
      msg: "添加成功"
    }
  }

})

router.get('/list',async (ctx,next) => {
  let list = await QRModel.find({})
  if(list){
    ctx.body = list
  }
})

module.exports = router