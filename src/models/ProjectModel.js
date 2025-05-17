const mongoose=require('mongoose');


const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }

},{timestamps:true});

const Project=mongoose.model('Projects',projectSchema);
module.exports=Project;