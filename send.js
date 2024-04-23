global.qr_code = ''
var p = require('./package.json')

String.prototype.cut = function (_0x164cc6) {
  return this.includes(_0x164cc6)
    ? this.split(_0x164cc6).filter((_0x4eeaec) => {
        return _0x4eeaec !== undefined && _0x4eeaec !== ''
      })
    : (this + _0x164cc6).split(_0x164cc6).filter((_0x1ee94d) => {
        return _0x1ee94d !== undefined && _0x1ee94d !== ''
      })
}
var express = require('express'),
  cors = require('cors'),
  secure = require('ssl-express-www')
let qrcode = require('qrcode')
const PORT = process.env.PORT || 8000
var app = express()
app.enable('trust proxy')
app.set('json spaces', 2)
app.use(cors())
app.use(secure)
app.use(express.static('assets'))
app.use(express.json())
app.use(async (_0xf200b, _0x3264c5) => {

  if (global.qr_code) {
    _0x3264c5.setHeader('content-type', 'image/png')
    _0x3264c5.end(Buffer.from(global.qr_code, 'base64'))
  } else {
    _0x3264c5.send('ok')
  }
})
app.listen(PORT, () => {
  console.log(PORT)
})
