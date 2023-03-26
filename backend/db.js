//Connection code of Mongodb Compass
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/iNotebook')
.then(()=>{
    console.log("MongoDb Connected Successfully")
}).catch("Not Connected")