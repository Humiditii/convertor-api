import Util from "../utility/Utility";

class EmptyCheck {
    static signinDetails(req, res, next){
        const {email, password} = req.body;
        if( email.length == 0 || password.length == 0){
            const error = {
                message: 'Empty field present!, please check and try again',
                statusCode: 409
            }
            return Util.appError(error, next);
        }else{
            next()
        }
    }
}

export default EmptyCheck;