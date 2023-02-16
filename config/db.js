const mongoose = require('mongoose');
exports.dbConn = async() =>{
    mongoose.set('strictQuery', false);
    try{
        const dbURL = "mongodb+srv://Ganesh:ganesh_123@cluster0.pjt5yrm.mongodb.net/eventdb";
        await mongoose.connect(dbURL);
        console.log('Database connected') ; 
    }catch(err){
        console.log(`Database Connection Error ${err.message}`);
    }
}
