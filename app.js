// external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const loginRouter = require('./router/loginRouter')
const usersRouter = require('./router/usersRouter')
const inboxRouter = require('./router/inboxRouter')

// internal imports
const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandler')

const app = express();
dotenv.config()

// database connection
mongoose.connect('mongodb+srv://chatApplication:miAToUuy89O5hYGm@cluster0.khxme.mongodb.net/chatapplication?retryWrites=true&w=majority', {
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
app.use('/', loginRouter)
app.use('/users', usersRouter)
app.use('/inbox', inboxRouter)


app.listen(8000, ()=>{
    console.log(`app listening to port ${process.env.PORT}`)
})