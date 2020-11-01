const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const passport = require('passport')

const app = express()
const items = require('./routes/api/items')
const products = require('./routes/api/products')
const users = require('./routes/api/users')

app.use(helmet())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))//html request format

console.log("Application Name:",config.get('name'))
console.log("Application Host:",config.get('mail.host'))
console.log('Password : ',config.get('mail.password'))
console.log(`Node Env: ${process.env.NODE_ENV}`)

if(app.get('env')==='development'){
    app.use(morgan('tiny'))
    console.log('morgan enabled...') //windows: set NODE_ENV=development or production
}else{
    console.log('morgan disabled...')
}



const uri = require('./config/keys').mongoURI;
const port = require('./config/keys').PORT;


mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => {
        console.error(err.message);
    });   

app.use(passport.initialize()); //passport middleware

require('./config/passport')(passport);

app.use('/api/items', items);
app.use('/api/products', products);
app.use('/api/users', users);

app.get('/', (req, res) => res.send('Server is working!'))
app.listen(port, () => console.log(`Listening...`))