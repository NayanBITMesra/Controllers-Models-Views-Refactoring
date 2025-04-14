const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}));

// MONGODB KE SAATH CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/project-app')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err));
//SCHEMA
const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: true,
    }
}, {timestamps: true} 
);

// CREATION OF USER MODEL
const User = mongoose.model('user', userSchema);

// CRUD OPERATIONS
app.get("/users", async(req, res) =>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app
    .route('/api/users')
    .get(async(req, res) =>{
        const allDbUsers = await User.find({});
        res.send(allDbUsers);
    })
    .post(async(req, res) => {
        const body = req.body;
        if(!body || 
            !body.first_name || 
            !body.last_name|| 
            !body.email || 
            !body.gender || 
            !body.job_title
        ){
            return res.status(404).json({msg: "All fields are required"});
        }
        const result = await User.create({
           firstName: body.first_name,
           lastName: body.last_name,
           email: body.email,
           gender: body.gender,
           jobTitle: body.job_title,

        });
        console.log(result);
        return res.status(201).json({msg: "success"});

        
    });
app
    .route('/api/users/:id')
    .get(async(req, res) =>{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error: "user not found"});
        return res.json(user);
    })
    .patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
        return res.json({staus: 'success'});
    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({staus: 'success'});
    });
app.listen(8000, () => console.log(`Server started at port: ${PORT}`));