const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authenticationMiddleware')

const router = express()

// New User
router.post('/n' , async(req,res)=>{
    const {username, email, password, role,experience} = req.body;
    console.log('Attempt to create new account starts here...')
    try{
        const hashedPw = await bcrypt.hash(password, 10)
        const newUser = new User ({username, email, password: hashedPw, role, experience})
        await newUser.save()
        res.status(200).json({'New User': newUser})
    }catch(err){
        res.send(err)
    }
})
const SECRET_KEY = "Test"
//Login
router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    console.log(`Attempting to log ${email}  in.....`)
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({error: "User not found"})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return  res.status(401).json({error: "Invalid Credentials"})
        const token = jwt.sign({id: user.id, role: user.role, experience: user.experience}, SECRET_KEY, {expiresIn: '1hr'})
        res.json({token})
    }catch(err){
            res.status(500).json({error:"Error Logging in", err})
        }
})


module.exports=router