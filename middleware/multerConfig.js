import multer from 'multer';


const storage = multer.memoryStorage();



const MAX_FILE_SIZE = 10 * Math.pow(10, 6);

const multerUploads = multer({ 
    storage: storage,
    limits: {fileSize: MAX_FILE_SIZE} });


export  default multerUploads;