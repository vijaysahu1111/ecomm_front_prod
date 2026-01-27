import User from "../models/User.js";
import sha1 from 'sha1'
import {ENC_KEY} from '../config/config.js'
import jwt from 'jsonwebtoken'
import randomstring from 'random-string'
import SendMail from "../helper/MailHelper.js";




let Auth = async(req, res)=>{
    let {email, password} = req.body; // {email : "sdfgsdfg@g.com", passwrod : "sdfgsdg"}
    let result = await User.find({email : email});
    if(result.length==1){ // email is correct
        if(result[0].password == sha1(password)) // password is correct
        {
            if(result[0].activeStatus==1){ // active

                let userobj = { _id : result[0]._id };
                let token = jwt.sign(userobj, ENC_KEY);
                let name = result[0].name;
                res.send({success:true, token, name})
            }else if(result[0].activeStatus==2){ // not verifed

                res.send({success:false, errType: 4})
            }else{ // de-active
                
                res.send({success:false, errType: 3})
            }
        }
        else{
            res.send({success:false, errType: 2})
        }
    }
    else{ // email is incorrect
        res.send({success:false, errType : 1})
    }

}
/*
email and password both incorrect ---- 1
email is correct but password incorrect ---- 2
both are correct but user deactive by admin ---- 3
both are correct but user not verified ---- 4
*/


let CheckEmail = async(req, res)=>{
    let e = req.params.e;
    let result = await User.find({email : e});
    if(result.length==0){
        res.send({success:true});
    }else{
        res.send({success:false});
    }
}

let CheckOTP = async(req, res)=>{
    // console.log(req.body)
    let {email, otp} = req.body;
    let result = await User.find({email: email});
    if(result[0].otp == otp){
        
        res.send({success:true, email:email})
    }else{
        res.send({success:false})
    }
}

let ChangePasswordByOTP = async(req, res)=>{
    let {email, password} = req.body;
    await User.updateMany({email : email}, {password : sha1(password), otp : ""});
    res.send({success:true})
}

let ForgotPassword = async(req, res)=>{
    let otp = randomstring({length : 4, letters : false});
    let {email} = req.body;
    let result = await User.find({email : email});
    if(result.length>=1){
        let message = `<h1>Reset Your Password</h1>
        <p><b>Hi ${result[0].name} </b></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida, metus sed convallis congue, lorem orci porta massa, sed rutrum erat nunc non magna.</p>
        <h1>${otp}</h1>
    `;
        //
        await User.updateMany({ _id : result[0]._id }, {otp : otp})
        SendMail(email, "james.steppingstone@gmail.com", "OTP for Forgot Password", message)
        res.send({success:true, email : email});
    }else{
        res.send({success:false})
    }
}

export {Auth, CheckEmail, ForgotPassword, CheckOTP, ChangePasswordByOTP};