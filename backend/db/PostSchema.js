const mongoose=require('mongoose');


const PostSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        
    },
    comments:[{
        comment: {
          type: String,
        },uid: { type: String},
        name:{type:String},
        date: { type: Date, default: Date.now },
        }]  ,    
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('post',PostSchema)