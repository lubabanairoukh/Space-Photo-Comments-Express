

const Cookies = require("cookies");
const bcrypt = require("bcrypt");
const db = require("../models");
const Sequelize = require("sequelize");


const keys = ['keyboard cat']
const option={
    signed: false,
    maxAge: 30 * 1000
}


exports.postNewRegister=(req,res)=>
{
    const cookies = new Cookies(req, res, { keys: keys });

    try{
        if( req.body.Password !== req.body.ConfirmPassword)
            throw new Error("Passwords dosen't matched");
    }
    catch(err){
        cookies.set('ERROR', err.message, option);
        res.redirect('/password');
        return;
    }

    try{
        if(!cookies.get('User'))
            throw new Error("Session expired, please try again");
    }
    catch(err){
        cookies.set('ERROR', err.message, option);
        res.redirect('/register');
        return;
    }
    bcrypt.hash(req.body.Password, 10, function(err, hash) {
        const Information= JSON.parse(cookies.get('User'));

        const user = db.Users.build({
            email: Information.emailAddress,
            password: hash,
            firstName: Information.firstname,
            lastName: Information.lastname,
        });
        console.log("why?????");

        user.save().then(()=>{
            cookies.set('SUCCESS',"you are registered", option);
            res.redirect('/');
            return;
        })
            .catch((err)=>{
                console.log(err.message);
                cookies.set('ERROR', err.message, option);
                res.redirect('/password');
                return;
            })
    });
}

exports.PostEmailRegister = (req,res)=>{
    const cookies = new Cookies(req, res, { keys: keys });
    cookies.set("User",JSON.stringify(
        {
            "emailAddress" :  req.body.emailAddress.trim().toLowerCase(),
            "firstname"    : req.body.firstname.trim().toLowerCase(),
            "lastname"     :req.body.lastname.trim().toLowerCase(),
        }),option );

    db.Users.findOne({
        where: {
            email: req.body.emailAddress.trim().toLowerCase()
        }}).then((user) =>{
        if (user)
            throw new Error('Email already exists');
        else
            res.redirect('/password');
    }).catch((err) =>{
        cookies.set('ERROR', err.message, option);
        res.redirect('/register');
        return;
    });
}

exports.getRegisterPage=(req,res)=>{
    const cookies = new Cookies(req, res, { keys: keys });

    if(req.session.Invisible)
    {

        res.redirect('/NasaWeb/Website');
        return;
    }
    const ERROR = req.cookies.ERROR;
    res.clearCookie('ERROR');

    if(cookies.get('User')){
        const user= JSON.parse(cookies.get('User'));
        res.render('register',{ERROR: ERROR,emailAddress: user.emailAddress,firstname: user.firstname,lastname: user.lastname,});
    }
    else{
        res.render('register',{ERROR: ERROR,emailAddress: '',firstname:'',lastname: '',});
    }
}

exports.getPasswordRegisterPage= (req,res)=>{
    const cookies = new Cookies(req, res, { keys: keys });

    if(!cookies.get('User')){
        res.redirect('/');
    }
    else{
        const ERROR = req.cookies.ERROR;
        res.clearCookie('ERROR');
        res.render('password',{ERROR:ERROR});
    }
}

exports.getLoginPage=(req,res,next)=>{
    if(req.session.Invisible)
    {
        res.redirect('/NasaWeb/Website');
        return;
    }
    const ERROR=req.cookies.ERROR;
    res.clearCookie('ERROR');
    const SUCCESS=req.cookies.SUCCESS;
    res.clearCookie('SUCCESS');

    res.render('login',{
        ERROR:ERROR,
        SUCCESS:SUCCESS,
    });
}


exports.logInNewUser=async(req,res)=>
{
    const cookies = new Cookies(req, res, { keys: keys });


    let validateEmail={
        "email"    :  req.body.email.trim().toLowerCase(),
        "password" :  req.body.password.trim().toLowerCase()
    }

    //i don't know if we should save the user in cookies or not!!!!
    try {
        let foundEmail = await db.Users.findOne({
            where:{
                email: validateEmail.email
            }});
        if (!foundEmail)
            throw new Error("Email Doesn't Exist,Try Another Email Or SignUp");
        else{
            let matchedPassword = await bcrypt.compare(validateEmail.password, foundEmail.password);
            if (!matchedPassword)
                throw new Error("The password you have entered is incorrect");
            else
            {
                // console.log("why i'm here????");
                // console.log( foundEmail.id);
                req.session.Invisible=true;
                req.session.firstName=foundEmail.firstName;
                req.session.lastName=foundEmail.lastName;
                req.session.UserId = foundEmail.id;
                res.redirect('/NasaWeb/Website');
                return;
            }
        }
    }
    catch(err){
        console.log(err.message);
        cookies.set('ERROR',err.message,{maxAge: 30*1000});
        res.redirect('/');
        return;
    };
}