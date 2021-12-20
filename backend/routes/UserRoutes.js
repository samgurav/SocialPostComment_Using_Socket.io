const express=require('express')
const mongoose=require('mongoose')
const  UserModel  = require("../db/UserSchema");
const PostModel=require('../db/PostSchema')
const router = express.Router();

const  connectdb  = require("../database/database");
router.post('/postuser',(req,res)=>{
   
    console.log(req.body)
 
let name=req.body.name;
let city=req.body.city;
let email=req.body.email;
let password=req.body.password;
let cpassword=req.body.cpassword;
let mobile=req.body.mobile;

// insert data
let ins=new UserModel({name:name,email:email,city:city,password:password,cpassword:cpassword,mobile:mobile});
ins.save((err)=>{
   if(err){ res.send("Already Added")}
  
})

})


router.get('/getpost', (req, res) => {
    UserModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//add post

router.post('/post',(req,res)=>{
   
    console.log(req.body)
 
   

// insert data
let  title=req.body.title;
let desc=req.body.desc;

let ins=new PostModel({title:title,desc:desc});
ins.save((err)=>{
   if(err){ res.send("Already Added")}
  
})

})



router.get('/getpostdata', (req, res) => {
    PostModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})



module.exports  =  router;