const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/postRoutes');

app.use(express.json());
app.use(userRoutes);
app.use(blogRoutes);

app.get("", (req, res)=>{
    res.send({"message":"welcome to homepage"});
});

app.listen(3000, ()=>{
    console.log("app running");
});