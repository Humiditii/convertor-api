import Auth from '../models/auth';
import Util from '../utility/Utility';
import e, { response } from 'express';

class AuthController {
    static async signup(req, res, next){
        const {email, password } = req.body;  
        const checkExisting = await Auth.find({email: email});
        if(checkExisting){
            return res.status(200).json({
                statusCode: 200,
                message: 'Mail exists, try to login or try another Mail'
            })
        }else{
            const hashedPwd = Util.hashPassword(password);
            const signupNew = new Auth({
                email: email,
                password: hashedPwd
            });

            signupNew.save().then( result => {
                return res.status(201).json({
                    message: 'User Signed up, proceed to login'
                })
            }).catch( err => {
                return Util.appError(err, next);
            })
        }
    }

    static async signin(req, res, next) {
        const {email, password} = req.body;

        const doesMailExist = await Auth.findOne({email: email});

        if(!doesMailExist){
            return res.status(404).json({
                message: 'User does not exist'
            })
        }else{
            const decryptPwd = Util.decodePwd(password, doesMailExist.password);
            if(!decryptPwd){ 
                return res.status(200).json({
                    message: 'Invalid Password'
                })
            }else{
                const user = {
                    email: findEmailDocument.email,
                    id: findEmailDocument._id
                }

                return res.status(200).json({
                    message: user.email +' logged in',
                    token: Util.generateToken(user)
                })
            }
        }
    }

}

export default AuthController;