const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) =>{
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null

    if(cookies){
        try{
            const token = cookies['jwt'];
            const decoded = jwt.verify(token, "secret")
            req.user = decoded;
            if(res.locals.html){
                res.locals.loggedInUser = decoded;
            }
            next()
        } catch(err){
            if(res.locals.html){
                res.redirect('/')
            }
            else{
                res.status(500).json({
                    errors: {
                        common: {
                            msg: "Authorization Failure!"
                        }
                    }
                })
            }
        }
    }
    else{
        if(res.locals.html){
            res.redirect('/');
        }
        else{
            res.status(401).json({
                error: "Authorization error!"
            })
        }
    }
    
}

const redirectLoggedIn = function (req, res, next)
{
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(!cookies)
    {
        next();
    }
    else{
        res.redirect('/inbox');
    }
}

module.exports = {
    checkLogin,
    redirectLoggedIn,
};