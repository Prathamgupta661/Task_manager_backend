const express = require('express');
const router = express.Router();

const Project = require('../models/ProjectModel');



router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({ createdby: req.user.id });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log("error in / project route",error);
        
    }
})

router.post('/create', async (req, res) => {
    try {
        const { title } = req.body;
        const project =await Project.create({
            title,
            createdby: req.user.id
        });
        res.status(201).json(project.title,project._id);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log("error in /create project route",error);
        
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log("error in /delete project route",error);
    }
})


module.exports = router;