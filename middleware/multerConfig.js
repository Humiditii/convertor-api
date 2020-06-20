import multer from 'multer';


const storage = multer.memoryStorage();



const MAX_FILE_SIZE = 10 * Math.pow(10, 6);

const fileFilter = (req, file, cb) => {
    if( 
        file.mimetype === 'text/xml'
    
    ){
       cb(null, true);
    }else{
        const err = new Error('Invalid File Type');
        cb(err,false)
    }
    
}


const multerUploads = multer({ 
    storage: storage,
    limits: {fileSize: MAX_FILE_SIZE}, fileFilter:fileFilter});


export  default multerUploads;