'use strict'

const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


//Monggose Schema para la base de datos
const userSchema = mongoose.Schema({
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
