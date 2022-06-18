// external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const loginRouter = require('./router/loginRouter')
const usersRouter = require('./router/usersRouter')
const inboxRouter = require('./router/inboxRouter')
const http = require("http");
const moment = require("moment");

// internal imports
const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandler')

const app = express();
//const server = http.createServer(app);
var server = app.listen(8000);
dotenv.config()

// socket creation
//const { Server } = require("socket.io");
//const io = new Server(server);
const io = require('socket.io')(server, {cors: { origin: "*"}});
global.io = io;

io.on('connection', (socket) => {
    console.log('user:' + socket.id)
})

// set comment as app locals
app.locals.moment = moment;

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


app.listen(5000, ()=>{
    console.log(`app listening to port ${process.env.PORT}`)
})

