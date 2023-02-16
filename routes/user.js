const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models/user');

router.post('/signup',async(req,res)=>{
    try{
        let {full_name,email,password} = req.body;

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt);
        
        const user = new User({full_name,email,password});
        await user.save();
    
        return res.status(200).json({
            message:"User saved Successfully",
        })
    }catch(err){
        return res.status(500).json({
            message:"Something Went Wrong",
            error:err.message
        })
    }
    
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(user){
            const verifyUser = await bcrypt.compare(password,user.password);
            if(verifyUser){
                const payload = {
                    user:{
                        id:user._id
                    }
                }
                const token  = jwt.sign(payload,'NirmanHackNation',{expiresIn:3600})
                return res.status(200).json({
                    message:"Logged in",
                    user:{user_id:user._id,email:user.email},
                    token,
                    email
                })
            }else{
                return res.status(401).json({
                    message:"Wrong Username/Password"
                })
            }
        }else{
            return res.status(401).json({
                message:"Please Register Yourself"
            })
        }

    }catch(err){
        return res.status(500).json({
            message:"Something Went Wrong",
            error:err.message
        })
    }
})

module.exports = router;