const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router();
const User = require('../../models/User');


//load input validation
const validateRegisterInput = require('../../validation/register') 
const validateLoginInput = require('../../validation/login') 

//@route GET api/users/test
//@desc test users routes
//@access Public

router.get('/test',(req,res)=>res.json({msg:'it works'}))

//@route POST api/users/register
//@desc test users routes
//@access Public

router.post('/register',(req,res)=>{
    const {errors,isValid} = validateRegisterInput(req.body);

    //check validation
    if(!isValid){
        console.log('not a valid register')
        return res.status(400).json(errors);
    }

    
    User
    .findOne({email:req.body.email})
    .then(user=>{
        if(user){
            errors.email="'Email already exists.'"
            return res.status(400).json({email:errors.email})
        }else{
            const avatar = gravatar.url(req.body.email,{
                s:200 ,//size
                r: 'pg',//rating
                d: 'mm', //default
            })

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            })
            //console.log(newUser)
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) {
                        console.log(err)
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save()
                    .then(user=>{
                        res.json(user)
                    })
                    .catch(err=>console.log(err))
                })
            })
        }
    }).catch(err=>console.log(err))
})

//@route POST api/users/login
//@desc return jwt user token
//@access Public
router.post('/login',(req,res)=>{

    const {errors,isValid} = validateLoginInput(req.body);

    //check validation
    if(!isValid){
        console.log('not a valid login')
        return res.status(400).json(errors);
    }


    const email = req.body.email;
    const password = req.body.password;

    //Find the user by email
    User.findOne({email:email})
    .then(user=>{
        //Check for user
        if(!user){
            errors.email='User not found'
            return res.status(404).json(errors)
        }

        //Check password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(isMatch){

                const payload = {id: user.id,name:user.name,avatar:user.avatar}//create jwt payload

                //User matched
                jwt.sign(payload,
                    keys.secretKey,
                    {expiresIn:3600},
                    (err,token)=>{
                        res.json({
                            success : true,
                            token: 'Bearer ' + token
                        })
                })
            }else{
                errors.password='Password incorrect'
                return res.status(400).json(errors)
            }
        })
    })
})
//@route GET api/users/session
//@desc return current user
//@access private

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({msg:'success!',id: req.user.id,name:req.user.name})
})



module.exports = router;