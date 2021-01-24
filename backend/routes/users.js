//'use strict'
const express = require('express'); // importar express


const userController = require('../controllers/user');

const usersRouter = express.Router(); // crear un express router

//============================ RUTAS ============================//
//Registrar un nuevo usuario
  usersRouter.post('/signup', userController.createUser);

//Inicio de sesion de usuario registrado
  usersRouter.post('/login', userController.loginUser);

module.exports = usersRouter;
