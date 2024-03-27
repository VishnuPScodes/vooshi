import multer from 'multer';
import path from 'path';

const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(currentDir, 'uploades'));
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now() + Math.random().toString();
    callback(null, uniquePrefix + '-' + file.originalname);
  },
});

const fileFilter = (req: any, file: any, callback: any) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
});

export default upload;
