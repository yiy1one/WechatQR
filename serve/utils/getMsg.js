const getRawBody = require('raw-body')
const xml2js = require('xml2js')

module.exports = async (ctx) => {
  const xml = await getRawBody(ctx.req, {
    length: ctx.request.length,
    limit: '1mb',
    encoding: ctx.request.charset || 'utf-8'
  })
  const result = await parseXML(xml)
  return result
}

function parseXML(xml) {
  return new Promise((resolve, reject) => {
   xml2js.parseString(xml, { trim: true, explicitArray: false, ignoreAttrs: true }, function (err, result) {
    if (err) {
      reject(err)
    }
      resolve(result.xml)
   })
  })
}