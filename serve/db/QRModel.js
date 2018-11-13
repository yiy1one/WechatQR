const mongoose = require('./config.js'),

Schema = mongoose.Schema

const QRSchema = new Schema({          
    event : { type: String },                    
    reply: {type: String},             
    base64: { type: String},

},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})

module.exports = mongoose.model('QR',QRSchema);