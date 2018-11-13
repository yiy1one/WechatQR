const axios = require('axios')
const config = require('./../config')
const accessTokenModel = require('./../db/accessTokenModel')


module.exports = {
  async getAccessToken(){
    return new Promise(async(resolve,reject)=>{
      let tokenData = await getAccessTokenFromDb()
      if((!tokenData) ||((tokenData.getTime + tokenData.expires_in*1000) < new Date().getTime())){
        tokenData = getAccessTokenFromWechat()
      }
      resolve(tokenData)
    })
  }
}

async function getAccessTokenFromWechat(){
  let tokenData = (await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appID}&secret=${config.appsecret}`)).data
  console.log(tokenData)
  if(!(await accessTokenModel.findOne({uid:1}))){
    saveAccessToken(tokenData)
  }else{
    updateAccessToken(tokenData)
  }
  return tokenData
}

async function getAccessTokenFromDb(){
  return new Promise(async (resolve,reject)=>{
    let tokenData = await accessTokenModel.findOne({uid:1})
    resolve(tokenData)
  })
}

async function saveAccessToken(tokenData) {
  let accessToken = new accessTokenModel({
    uid:1,
    access_token:tokenData.access_token,
    expires_in:tokenData.expires_in - 100,  //为避免出错，减少100秒
    getTime:new Date().getTime()
  })
    await accessToken.save()
}

async function updateAccessToken(tokenData){
  await accessTokenModel.updateOne({uid:1},{
    access_token:tokenData.access_token,
    expires_in:tokenData.expires_in - 100,  //为避免出错，减少100秒
    getTime:new Date().getTime()
  })
}