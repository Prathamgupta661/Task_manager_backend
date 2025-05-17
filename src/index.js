require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB = require('./utils/ConnectDB');
const UserRoutes=require('./routes/UserRoutes');
const Auth = require('./middleware/Auth');
const ProjectRoutes=require('./routes/ProjectRoutes');
const TaskRoutes=require('./routes/TaskRoutes');


const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB()

const url="http://localhost:3000";
const interval=30000;

function refreshconnection() {
    fetch(url).then(()=>console.log("Connection Refreshed")).catch((err)=>console.log(err));
}
setInterval(refreshconnection,interval);

app.use('/user',UserRoutes)
app.use('/projects',Auth,ProjectRoutes)
app.use('/tasks',Auth,TaskRoutes)

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
