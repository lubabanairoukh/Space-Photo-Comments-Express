
const Cookies = require("cookies");
const bcrypt = require("bcrypt");
const db = require("../models");
const Sequelize = require("sequelize");


const keys = ['keyboard cat']
const option={
    signed: false,
    maxAge: 30 * 1000
}

exports.getWebsitePage=(req,res)=>
{
    if(!req.session.Invisible)
    {
        res.redirect('/');
        return;
    }
    const ERROR=req.cookies.ERROR;
    res.clearCookie('ERROR');
    const SUCCESS=req.cookies.SUCCESS;
    res.clearCookie('SUCCESS');

    res.render('NasaWeb',{
        ERROR:ERROR,
        SUCCESS:SUCCESS,
        UserId: req.session.UserId,
        firstName: req.session.firstName,
        lastName: req.session.lastName,
    });
}

exports.postNewComment= async(req,res)=>{
    let UserId = req.session.UserId;
    let CommentString=req.body.comment;
    let DateImage=req.body.idImg;
    
    console.log(DateImage);
    if (!CommentString || !UserId || !DateImage)
        throw new Error('ERROR!!');

    try {
        console.log(DateImage);
        await db.Comments.build({
            UserId:  UserId,
            ImageId: DateImage,
            Comment: CommentString,
        }).save();
        
        console.log(DateImage);
        return res.json({});
    } catch (error) {
        throw new Error(error.message);
        
    }
}

exports.getComments= async (req, res) => {
    const CoomentsId = req.query;
     where={ImageId: CoomentsId.ImageId};
        try {
            const comment= await db.Comments.findAll({
                where,
                include: [
                    {
                        model: db.Users,
                        attributes: ["firstName", "lastName"],

                    },
                ],
            });
            return res.json(comment);
        } catch (err) {
            throw new Error(err.message);
        }
}

exports.deleteComment=async(req,res)=>
{
    try{
        const comment = await db.Comments.findOne({ where: req.body });
        await comment.destroy();
        return res.json({});
    }
    catch(err)
    {
        console.log(err.message);
    }
}
