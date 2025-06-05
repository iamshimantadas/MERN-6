const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongo = require('../mongodb');

router.use(express.json());

const UserSchema = new mongoose.Schema({
    'name': String,
    'email': {type: String, unique: true},
    'password': String,
    'phone': String
});

// user's registration
router.post("/user/register", async (req, res) => {
    try {
        const db = await Mongo();
        const User = db.model('users', UserSchema);
        let result = new User({
            "name":req.body.name, 
            "email":req.body.email,
            "password":req.body.password,
            "phone":req.body.phone
        });
        result.save();
        if(result._id){
            res.status(201).send({"status":"success", "message":"new user created"});
        }
    } catch (err) {
        res.status(400).send({ "status": "failed" });
    }
});

// user's login
router.post("/user/login", async (req, res) => {
    try {
        const db = await Mongo();
        const User = db.model('users', UserSchema);
        const result = await User.find({"email": req.body.email}).exec();
        if(result.length){
            if(result[0].password == req.body.password){
                res.status(201).send({"status":"success", "message":"user found"});
            }else{
                res.status(401).send({"status":"success", "message":"password not match"});
            }
        }else{
           res.status(401).send({"status":"email not found"}); 
        }
    } catch (err) {
        res.status(401).send({ "status": "failed" });
    }
});

// all users
router.get("/user", async (req, res) => {
    try {
        const db = await Mongo();
        const User = db.model('users', UserSchema);
        const result = await User.find({}).exec();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ "status": "failed" });
    }
});

// fund by user id
router.get("/user/:id", async (req, res) => {
    try {
        const db = await Mongo();
        const User = db.model('users', UserSchema);
        const result = await User.findById(req.params.id).exec();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ "status": "failed" });
    }
});

// update user
router.put("/user", async (req, res) => {
    try {
        const db = await Mongo();
        const User = db.model('users', UserSchema);
        const fields = await User.findOne({"_id":req.body.id});
        if(req.body.name){
            fields.name = req.body.name;
        }
        if(req.body.email){
            fields.email = req.body.email;
        }
        if(req.body.password){
            fields.password = req.body.password;
        }
        fields.save();
        
        res.status(201).send({"status":"success", "message":"user record updated"});
    } catch (err) {
        res.status(400).send({ "status": "failed" });
    }
});

module.exports = router;