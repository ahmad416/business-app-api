const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const config = require('config')
//Routes Files
const users = require('./routes/users')
const auth = require('./routes/auth')

//Checking Envirnment Variable are setup or not
if(!config.get("jwtPrivateKey.jwtKey")){
    console.error("FATAL ERROR: jwtPrivateKay is not define")
    process.exit(1)
}
//mongodb connection
const dbconfig = config.get("dbconfig.dbURI")
mongoose.connect(dbconfig)
.then(() => console.log('Connected to mongodb database.......'))
.catch( err  => console.error('Error in connecting to the database....'))
app.get('/', (req,res) => {
    res.send(`<h1>Hello World</h1>`)
})
//Use the Routes files
app.use(express.json())
app.use('/api/users', users)
app.use('/api/auth', auth)

//initilizing the app
const port = process.env.PORT || 3000
app.listen(port,()=> console.log(`Listening to ${port}........`))

