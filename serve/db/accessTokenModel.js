const mongoose = require('./config')

Schema = mongoose.Schema

const accessTokenSchema = new Schema({
  uid:Number,
  access_token:String,
  expires_in:Number,
  getTime:Number
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})

const accessTokenModel = mongoose.model('accessToken',accessTokenSchema)

module.exports = accessTokenModel