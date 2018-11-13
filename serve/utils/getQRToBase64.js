let base64Img = require('base64-img');

async function getQRToBase64(imgUrl) {
  console.log('imgurl',imgUrl)
  return new Promise((resolve,reject)=>{
    base64Img.requestBase64(imgUrl,(err,res,body)=>{
      resolve(body)
    })
  })
}

module.exports = getQRToBase64