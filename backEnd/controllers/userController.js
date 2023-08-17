const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc       Register new user
// @route      POST/api/users
// @access     public

const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if email already exists 
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('Email already exists')
    }

    // Has password
    const salt = await bcrypt.genSalt(10)
    const hasedPassowrd = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hasedPassowrd
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)    
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc       Login user
// @route      POST/api/users
// @access     public

const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if email already exists 
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare([password, user.password]))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser
}


