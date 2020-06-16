import { v2 } from 'cloudinary';
import dotenv from 'dotenv';


class Cloudinary {
    static toCloud(file, unique_name){

        dotenv.config();

        v2.config({

            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,

        });

       return  v2.uploader.upload(file, {public_id: unique_name})
    }
}



export default Cloudinary;