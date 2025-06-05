const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(userRoutes);
app.use(express.json());

app.get("", (req, res)=>{
    res.send({"message":"welcome to homepage"});
});

app.listen(3000, ()=>{
    console.log("app running");
});