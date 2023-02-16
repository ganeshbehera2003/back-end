const express = require('express');
const eventRoutes = require('./routes/event')
const userRoutes = require('./routes/user')
const { dbConn } = require('./config/db')
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors());

app.use('/event',eventRoutes);
app.use('/user',userRoutes);

dbConn();

app.listen(4001,()=>{
    console.log(`The Server is running on the port 4001`);
})