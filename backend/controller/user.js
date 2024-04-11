const UserModel  = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signup = async(req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 8 , async(err, hash) => {
    const new_user = new UserModel ({
        name,
        email,
        password : hash
    }) 
    try 
    {
        await new_user.save();
        res.send({msg : "user inserted successfully", new_user})
    }
    catch(err)
    {
        res.send({error : "Something went wrong"})
    }
})
}

const login = async(req, res)=> {
     const {email, password} = req.body;
     const  user = await UserModel.findOne({email});
     const hashed_password = user?.password;

    if(!user)
    {
        return res.send({"msg" : "Login again! Invalid Credentials"});
    }

    bcrypt.compare(password, hashed_password, (err, result)=> {
      
        if(result)
        {
            const token = jwt.sign({user_id : user._id}, 'shhhhh')
            return res.send({"msg" : "Login successful", "token" : token });
        }
        else
        {
           return res.send({"message" :"Login again! Invalid Credentials"});
        }
     })
}

module.exports = {
    signup,
    login
};