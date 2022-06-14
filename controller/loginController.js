const User = require('../models/People')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

function getLogin(req, res, next)
{
    res.render('index')
}

async function login(req, res, next){
    try{
        // find a user who has this email/username
        const user = await User.findOne({
            $or: [{ email: req.body.username}, {mobile: req.body.username}]
        })

        if(user && user._id){
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if(isValidPassword){
                const userObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: "user"
                }

                //generate token
                const token = jwt.sign(userObject, "secret", {
                    expiresIn: '24h',
                })

                //set cookie
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24*60*60*1000, //1 day
                    signed: true
                })

                // set logged in user local identifier
                res.locals.loggedInUser = userObject;

                res.render("inbox");
            }
            else
            {
                throw createError("Login Failed! please try again")
            }
        }
        else{
            throw createError("Login Failed! please try again")
        }
    }
    catch(err){
        res.render("index", {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message
                }
            }
        })
    }
}

function logout(req, res){
    res.clearCookie('jwt');
    res.send('Logged out');
}

module.exports = {
    getLogin,
    login,
    logout
}