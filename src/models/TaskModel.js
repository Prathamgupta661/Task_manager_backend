const mongoose=require('mongoose');


const Taskschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Projects',
        required:true
    },
    status:{
        type:String,
        enum:['Pending','In Progress','Completed'],
        default:'Pending'
    },
    completedAt: String,
},{timestamps:true});

const Task=mongoose.model('Tasks',Taskschema);
module.exports=Task;