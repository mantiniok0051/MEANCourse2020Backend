//'use strict'
const express = require('express'); // importar express
const postsRouter = express.Router(); // crear un express router

const postController = require('../controllers/post');

const checkAuth = require('../middleware/check-auth');
const checkFile = require('../middleware/check-file');



//============================ RUTAS ============================//
  //Registrar un nuevo Post
  postsRouter.post('', checkAuth, checkFile, postController.createPost);

  //Actualizar / Editar un post *requiere el ID a actualizar
  postsRouter.put('/:target_id', checkAuth, checkFile, postController.updatePost);

  //Traer todos los posts en la base de datos
  postsRouter.get('' ,postController.loadAllPost);

  //Borrar un post *requiere el ID a borrar
  postsRouter.delete('/:target_id', checkAuth, postController.deletePost );

  //Traer un post desde la base de datos *requiere el ID a recuperar
  postsRouter.get('/:target_id', postController.loadPost );

module.exports = postsRouter;
