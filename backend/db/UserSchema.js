const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
     
    },
    email:{
        type:String, 
        unique:true
    },
    mobile:{
        type:String,
        required:true

      
    },
    city:{
        type:String,
        required:true
      
    },
    password:{
        type:String,
        required:true
      
        
    },
    cpassword:
    {
        type:String,
        required:true
    
    }

})

module.exports=mongoose.model('user',UserSchema)