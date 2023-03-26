const mongoose = require('mongoose');
const { Schema } = mongoose;

//Schema is used to idetify the wrong entry in the database from the user

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  
  const User = mongoose.model('user', UserSchema);  //In my code this line is not writeen by me!!
  module.exports = User;