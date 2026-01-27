import { ENC_KEY } from '../config/config.js';
import jwt from 'jsonwebtoken';
let IsUserLoggedIn = (req, res, next)=>{
    // console.log(req.headers)
    if(req.headers.authorization){

        let token = req.headers.authorization;
        let obj = jwt.decode(token, ENC_KEY);
        if(obj){
            req.obj = obj;
            next();
        }else{

            res.send({success:false, message : "Un-Authorized"});
            return;
        }

    }else{
        res.send({success:false, message : "Un-Authorized"});
        return;
    }
}

export default IsUserLoggedIn;