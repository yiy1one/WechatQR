const config = require('../config')
const crypto = require('crypto');

module.exports = () => {
  return async(ctx,next) => {
    const token = config.Token
    const { signature, timestamp, nonce, echostr } = ctx.query

    let str = [token,timestamp,nonce].sort().join('')
    const hash = crypto.createHash('sha1');
    hash.update(str)
    
    const sha1 = hash.digest('hex')
    
    if(sha1 == signature){
      if(ctx.method === 'GET'){
        ctx.body = echostr
      }else{
        await next()
      }
    }else{
      console.log('请求不是来自微信官方服务器')
      ctx.body = 'error'
    }
  }
}