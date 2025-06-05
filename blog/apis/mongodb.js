async function connect(){
    try{
        const mongoose = require('mongoose');
        return await mongoose.connect('mongodb://127.0.0.1:27017/blogs');
    }catch(err){
        return false;
    }
}

module.exports = connect;