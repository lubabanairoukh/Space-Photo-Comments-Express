
var express = require('express');

const router = express.Router();


const conrtollerLogin = require("../Controller/LoginController");

//---------------------------------------------------------------------------
/* GET login page. */
router.get('/',conrtollerLogin.getLoginPage);
router.post('/',conrtollerLogin.logInNewUser);

router.get('/register',conrtollerLogin.getRegisterPage);

router.get('/password',conrtollerLogin.getPasswordRegisterPage);

router.post('/password', conrtollerLogin.PostEmailRegister);

router.post('/login',conrtollerLogin.postNewRegister);

router.get('/redirectPass',(req,res) =>
{
  res.redirect('/');
});

router.get('/logout',(req,res)=>
{
  req.session.destroy(()=>{
        return res.redirect('/');
    });
});





module.exports = router;