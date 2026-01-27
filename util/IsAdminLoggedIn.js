import { ENC_KEY } from '../config/config.js';
import jwt from 'jsonwebtoken';
let IsAdminLoggedIn = (req, res, next)=>{
    if(req.headers.authorization){

        let token = req.headers.authorization;
        let obj = jwt.decode(token, ENC_KEY);
        if(obj){
            req.adminobj = obj;
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

export default IsAdminLoggedIn;