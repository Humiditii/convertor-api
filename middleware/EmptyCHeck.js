import Util from "../utility/Utility";

class EmptyCheck {
    static signinDetails(req, res, next){
        const {email, password} = req.body;
        if( email.length == 0 || password.length == 0){
            const error = {
                message: 'Empty field',
                statusCode: 409
            }
            return Util.appError(error, next);
        }
    }
}

export default EmptyCheck;