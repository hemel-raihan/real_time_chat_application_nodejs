// external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');

// internal imports
const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandler')

const app = express();
dotenv.config()

// database connection
mongoose.connect('mongodb+srv://chatApplication:miAToUuy89O5hYGm@cluster0.khxme.mongodb.net/chatApplication?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("database connection successful"))
.catch(err => console.log(err))

// request parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//s et view engine
app.set("view engine", "ejs")

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// parse cookies
app.use(cookieParser('secret'))

// routing setup

// 404 error handling
 app.use(notFoundHandler)
 //common error handler
 app.use(errorHandler)

app.listen(8000, ()=>{
    console.log(`app listening to port ${process.env.PORT}`)
})