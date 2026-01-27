import mongoose from '../db/conn.js';
let UserSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    contact : String,
    gender : String,
    city : String,
    address : String,
    otp : { type : String, default : ""},
    emailVerifiyString : {type : String, default : ""},
    image : { type : String, default : ""},
    activeStatus : { type : Number, default : 2 },

    // activeState = 1 --- active
    // activeState = 0 --- deactive
    // activeState = 2 --- not verified
}, {timestamps : true})

const User = mongoose.model("user", UserSchema);

export default User;