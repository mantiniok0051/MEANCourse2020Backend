'use strict'//Activar modo estricto y funcionalidades ECMA-SCRIPT 5-6


const mongoose = require('mongoose');

//Monggose Schema para la base de datos
const postSchema = mongoose.Schema({
  title: {type: String, required:true},
  content: {type: String, required:true},
  imagePath: {type: String, required:false},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true}
});

module.exports = mongoose.model('Post', postSchema);
