const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const my_secret_key = "This is my secret string";

let users = [
    {_id:1,username: "admin",password: "1234"}
]


router.post("/register",(req,res) => {
    let user = req.body;
    if(user==null ||  user==undefined) {
        res.status(401).send("Invalid user data!")
    }
    user._id = users.length + 1;
    users.push(user)
    res.status(200).send({'msg': 'You have been successfully registered an account'})
})

router.post("/login",(req,res) => {
    let user = req.body;
    if(user==null ||  user==undefined) {
        res.status(401).send("Invalid user data!")
    }
    let valid = false;
    for(let i=0;i<users.length;i++) {
        if(user.username === users[i].username && user.password === users[i].password) {
            valid =  true;
            break;
        }
    }
    if(valid) {
        //Generate token for this user
        let payload = {subject: user.username }
        let token = jwt.sign(payload,my_secret_key)

        res.status(200).send({ access_token: token})
    } else {
        res.status(401).send("Login Failed!")
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization) {
        return res.status(401).send("Missing Authorization header!")
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token == null) {
        return res.status(401).send("Missing Authorization token!")
    }

    try{
        let decoded = jwt.verify(token,my_secret_key)
        if(!decoded) {
            return res.status(401).send("Invalid token!")
        } else {
            console.log(decoded)
        }
    } catch(e) {
        return res.status(401).send("Invalid token!")
    }
     
  
    
    next();
}

router.get('/user',verifyToken,(req,res) => {
    let userList = []
    users.forEach(u => {
        user = {
            id: u._id,
            username: u.username
        }
        userList.push(user)
    })
    res.json(userList);
})

module.exports = router;