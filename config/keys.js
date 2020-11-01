const config = require('config')

module.exports = {
    mongoURI: "mongodb+srv://khaledadrani:"+config.get('mail.password')+"@cluster0-smqzs.mongodb.net/test?retryWrites=true&w=majority",
    PORT: process.env.PORT || 5000,
    secretKey: 'secret'
}