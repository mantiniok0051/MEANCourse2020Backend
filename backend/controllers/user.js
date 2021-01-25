const User = require('../models/user');//Crear controlador de db-table con mongo y el modelo
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 


//Registrar un nuevo usuario
exports.createUser = (request, response, next)=>{
    bcrypt.hash(request.body.password, 10)
          .then((hashed_pwd)=>{
            const new_user = new User({
              email: request.body.email,
              password: hashed_pwd
            });
            new_user.save().then((result)=>{
              console.log('User registration successfull');
                  response.status(201).json({
                    message: 'User registration successfull',
                    result: result
                  });
                })
                .catch((error)=>{
                  console.log('User registration failed');
                  response.status(500).json({
                    message: 'Invalid registration data',
                    error: error
                  });
                });
          });
    }

exports.loginUser = (request, response, next)=>{
    let verificated_user;
    User.findOne({email:request.body.email, })
      .then((fetched_user) => {
          if (!fetched_user) {
            console.log('User authentication failed no user with that ID');
            return response.status(401).json({
              message:'User authentication failed no user with that ID'
            });
        }
          verificated_user = fetched_user;
          return bcrypt.compare(request.body.password,
                                fetched_user.password);
      })
      .then((result) => {
          if(!result){
            console.log('User authentication failed PWD error');
          return response.status(401).json({
              message: 'User authentication failed PWD error'
            });
        }
        const token = jwt.sign({
          email: verificated_user.email, userID: verificated_user._id},
          process.env.JWT_KEY,
          {expiresIn:'1h'});
          console.log('User authentication successfull');
          response.status(200).json({
            token:token,
            expiresIn:3600000,
            userID:verificated_user._id
          });
      })
      .catch((error) =>{
        console.log('User authentication failed');
        return response.status(401).json({
          message: 'User authentication failed',
          error: error
        });
      });

}