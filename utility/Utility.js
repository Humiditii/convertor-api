import { hashSync , compareSync} from 'bcryptjs';
import {sign} from 'jsonwebtoken'
import dotenv from 'dotenv';
import {randomBytes} from 'crypto';


dotenv.config()

class Utility {
    static  hashPassword(password){
        const hashedPwd =  hashSync(password, 10);
        return hashedPwd; 
    }

    static decodePwd(reqPassword, dbPassword){
        const compare = compareSync(reqPassword, dbPassword);
        return compare;
    }

    static appError (err, next){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

    static generateToken(user_token_data){
        return sign({
            email:user_token_data.email,
            userId: user_token_data.id
        }, process.env.SECRET, { expiresIn: '24h' } )
    }

    static randomStr(){
        return randomBytes(5).toString('hex');
    }

}


export default Utility;
