import User from '../models/User.js';
import sha1 from 'sha1'
import jwt from 'jsonwebtoken'
import { ENC_KEY, DOMAIN, DOMAIN_FRONT, RAZORPAY_KEY, RAZORPAY_SECRET } from '../config/config.js';
import Path from 'path';
import { UniqueString } from 'unique-string-generator'
// import randomstr from 'random-string'
import randomString from 'random-string';
import SendMail from '../helper/MailHelper.js';





let AccountActivation = async(req, res)=>{
    // console.log(req.params);
    let x = req.params.x;
    await User.updateMany({emailVerifiyString : x }, {activeStatus : 1});
    res.redirect(`${DOMAIN_FRONT}/activation`);
}

let SaveUser = async(req, res)=>{
    delete req.body.repassword;
    
    req.body.password = sha1(req.body.password);
    let str = randomString({length : 50})
    req.body.emailVerifiyString = str;
    req.body.activeStatus = 1;
    
    
   /* SendMail(req.body.email, "james.steppingstone@gmail.com", "Activate Your Account", `
        <p>Welcome <b>${req.body.name}</b>,</p>
        
<p>Thanks for signing up.</p>
        
<p>You will only need to visit the link once to verify and activate your account.</p>
        
<p>To complete your account verification, please click the link given below:-</p>
        
        <a href='${DOMAIN}/api/v1/user/account-activation/${str}' style="background-color : #451245; color : #fff; padding : 10px 20px; border-radius : 5px; font-size : 15px; text-decoration : none;">Click Here</a>
        <p>
        If the above link does not work, please copy and paste link into your web browser.
        <br />
If you are still having problems signing up then please do get in touch.
        </p>
Thanks

        `)
    
*/
    await User.create(req.body);
    res.send({success:true});
}


let DeleteAll = async(req, res)=>{
    await User.deleteMany();
    res.send("All Data Deleted")
}


let Profile = async(req, res)=>{

   if(req.headers.authorization){
    let token = req.headers.authorization;
    let userobj = jwt.decode(token, ENC_KEY);
    if(userobj){
        // console.log(userobj);
        let id = userobj._id;
        let result = await User.find({_id : id}).select("-password -createdAt -updatedAt").exec();
        // console.log(result[0]);
        res.send(result[0]);
    }else{
        res.send({success:false, message : "Un-Authorized user"})
    }
}
else{
       res.send({success:false, message : "Un-Authorized user"})
   }


}


let GetAllUser = async(req, res)=>{
    let result = await User.find({}, "-password");
    res.send({success:true, result})
}

let UpdateUser = async(req, res)=>{

    
    let id = req.params.id;
    let result = await User.updateMany({_id : id }, req.body);
    res.send({success:true, result})
}

let UpdateUserProfile = async(req, res)=>{
    // console.log(req.body); return;
    // console.log(req.obj);
    let id = req.obj._id;
    let result = await User.updateMany({_id : id}, req.body);
    res.send({success : true, result});
}

let UpdateUserProfilePassword = async(req, res)=>{
    let { curr_pass, new_pass } = req.body;
    let id = req.obj._id;
    let result = await User.find({_id : id});
    if(result[0].password == sha1(curr_pass))
    {
        await User.updateMany({_id : id}, { password : sha1(new_pass)});
        res.send({success:true})
    }
    else{
        res.send({success:false})
    }

}

let UploadProfilePic = async(req, res)=>{
    // console.log(req.files);
    let photo = req.files.photo;
    let arr = photo.name.split(".")
    let ext = arr[arr.length-1];
    let uniquename = UniqueString()+"."+ext;
    let id = req.obj._id;
    photo.mv(Path.resolve()+"/assets/user_images/"+uniquename, (err)=>{
        if(err){
            console.log(err)
        }
    })
    let result = await User.updateMany({_id : id}, {image : uniquename});
    res.send({success:true, image : uniquename})

}

let CountUser = async(req, res)=>{
    let total = await User.countDocuments();   
    res.send({success:true, total});
}

export {SaveUser, CountUser, UploadProfilePic, AccountActivation, DeleteAll, Profile, GetAllUser, UpdateUserProfilePassword, UpdateUser, UpdateUserProfile}