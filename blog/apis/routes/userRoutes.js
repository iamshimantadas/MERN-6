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
            res.status(201).send({"status":"success"});
        }
    } catch (err) {
        res.status(400).send({ "status": "failed" });
    }
});

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

module.exports = router;