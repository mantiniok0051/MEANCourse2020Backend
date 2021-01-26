
const jwt = require('jsonwebtoken');
const multer = require('multer');


module.exports = (request, response, next) =>{
  try {
        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        request.userData = {eMail: decodedToken.email,
                            usrID: decodedToken.userID};
        next();
  } catch (error) {
    response.status(401).json({
      message: 'You are not authenticated!'
    });
  }
};
