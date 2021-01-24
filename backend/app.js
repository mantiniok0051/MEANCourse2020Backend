'use strict'//Activar modo estricto y funcionalidades ECMA-SCRIPT 5-6

  const express = require('express');//Importar ExpresJS
  const bparser = require('body-parser');
  const mongoose = require('mongoose');
  const pathBuilder = require('path');

  const postsRoutes = require('./routes/posts');
  const usersRoutes = require('./routes/users');


  const app = express();//Inicializar ExpressObject

//Inicializar la conexion al servicio de MongoDBAtlas.
  mongoose.connect('mongodb+srv://mean-course:OmbMe2Q8Kp5bG59D@meancourse.jn7zy.mongodb.net/MEANCourse')
  .then(()=>{
    console.log('Conected to Database');
  })
  .catch(()=>{
    console.log('Connection Failed');
  });
//============================ MIDDLEWARES ============================//
  app.use(bparser.json());
  app.use(bparser.urlencoded({extended:false}));

  app.use('/imgs', express.static(pathBuilder.join('backend/uploads/imgs')));

  app.use( (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    response.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PATCH, PUT, DELETE');
    next();
  });

  app.use('/api/posts',postsRoutes);
  app.use('/api/users',usersRoutes);

//============================ RUTAS ============================//

//============================ EXPORTAR ============================//
    module.exports = app;
