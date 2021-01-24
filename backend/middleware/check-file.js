const multer = require('multer');

const MIME_TYPE_MAP ={
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
  
  };

  const storage = multer.diskStorage({
    destination:(request, file, callback)=>{
      const mime_valid =  MIME_TYPE_MAP[file.mimetype];
      let error = new Error('Invalid MIME type');
      if (mime_valid) {
        error = null;
      }
      callback(error, 'backend/uploads/imgs')
    },
    filename:(request, file, callback)=>{
      const file_name = file.originalname.toLowerCase().split(' ').join('-');
      const file_ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, file_name + '-' + Date.now() + '.' + file_ext);
    }
  });

module.exports = multer({storage:storage}).single('image');