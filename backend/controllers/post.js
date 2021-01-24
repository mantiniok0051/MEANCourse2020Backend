

const Post = require('../models/post'); //Crear controlador de db-table con mongo y el modelo


//Registrar un nuevo Post
exports.createPost = (request, response, next)=>{
     const url =  request.protocol + '://' + '192.168.100.8:4202';
     console.log(request.userData);
     const post = new Post({
       title: request.body.title,
       content: request.body.content,
       imagePath: url + '/imgs/' + request.file.filename,
       creator: request.userData.usrID
     });
     post.save().then(createdPost =>{
       response.status(201).json({
           message: 'Post added successfully',
           post: {
           ...createdPost,
           id: createdPost._id
         }
       });
     })
     .catch( error =>{
       response.status(500).json({
         message: 'Post creation failed',
         error: error
       });
     });
}

//Actualizar / Editar un post *requiere el ID a actualizar
exports.updatePost = (request, response, next)=>{
        let imagePath = request.body.imagePath;
        if (request.file) {
            const url =  request.protocol + '://' + '192.168.100.8:4202';
            imagePath = url + '/imgs/' + request.file.filename;
        }
        const updated_post = new Post({
            _id: request.body.id,
            title: request.body.title,
            content: request.body.content,
            imagePath: imagePath,
            creator: request.userData.usrID
        });
        Post.updateOne({_id:request.params.target_id, creator:request.userData.usrID},
                        updated_post).then(result =>{
                        if (result.nModified > 0) {
                            response.status(200).json({message:'Post Updated'});
                        } else {
                            response.status(401).json({message:'Not authorized to update this post'});
                        }
                        })
                        .catch(error=>{
                        response.status(500).json({
                            message:'Culdn\'t update the post'
                        });
                        });
}

//Traer todos los posts en la base de datos
exports.loadAllPost =(request, response, next) => {
    const pageSize = +request.query.pagesize;
    const currentPage = +request.query.page;
    const postQuery = Post.find();
    let  fetchedPosts;

    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1))
               .limit(pageSize);
    }
    postQuery
    .then(documents =>{
        fetchedPosts = documents;
        return Post.estimatedDocumentCount();
      })
    .then(count => {
      response.status(200).json({
            message: 'Post fetched successfully',
            posts: fetchedPosts,
            totalStoredPosts: count
    });
        })
    .catch(err => {
          console.log('Connection to data service failed: ');
          console.log(err);
          response.status(400).json({
            message: 'Connection to data service failed',
            error: err
          });
        });
  }

//Borrar un post *requiere el ID a borrar
exports.deletePost =  (request, response, next)=>{
    Post.deleteOne({_id: request.params.target_id, creator:request.userData.usrID}).then(result => {
      console.log(result);
        if (result.n > 0) {
          response.status(200).json({message:'Post Deleted'});
        } else {
          response.status(401).json({message:'Not authorized to delete this post'});
        }
    })
    .catch(error=>{
      response.status(500).json({        
        message: 'Connection to data service failed',
      });
    });
  }


//Traer un post desde la base de datos *requiere el ID a recuperar
exports.loadPost = (request, response, next)=>{
    Post.findById(request.params.target_id).then(post => {
      if (post) {
        response.status(200).json(post);
      } else {
        response.status(404).json({message:'Post not found!'});
      }
    })
    .catch(error=>{
      response.status(500).json({        
        message: 'Connection to data service failed',
      });
    });
  }