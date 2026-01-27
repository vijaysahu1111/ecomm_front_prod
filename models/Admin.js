import mongoose from '../db/conn.js';

const AdminSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String,
    type : String
})

const Admin = mongoose.model("admin", AdminSchema);
export default Admin;