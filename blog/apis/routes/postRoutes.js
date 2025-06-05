const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongo = require('../mongodb');

router.use(express.json());

const BlogSchema = new mongoose.Schema({
    'title': {type: String, unique: true, required: true},
    'content': String,
    'excerpt': String,
    'thumbnail_img': String,
    'user' : {type: Number, require: true}
});

// all blogs
router.post("/posts", async (req, res) => {
    try {
        const db = await Mongo();
        const Posts = db.model('posts', BlogSchema);
        if(Posts){
            res.status(201).send({"status":"success", "message":"new post created"});
        }else{
            res.status(400).send({"status":"success", "message":"new post created"});   
        }
        
        // let result = new Posts({
        //     'title': req.body.title,
        //     'content': req.body.content,
        //     'excerpt': req.body.excerpt,
        //     'thumbnail_img': req.body.thumbnail,
        //     'user' : req.body.user_id
        // });
        // result.save();
        // console.log("blog id "+ result._id);
        
        // if(result._id){
        //     res.status(201).send({"status":"success", "message":"new post created"});
        // }
    } catch (err) {
        res.status(400).send({ "status": "failed" });
    }
});


module.exports = router;