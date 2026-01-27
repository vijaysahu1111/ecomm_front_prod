import mongoose from '../db/conn.js';
let CateSchema = mongoose.Schema({
    title : String
    
}, {timestamps : true})

const Cate = mongoose.model("category", CateSchema);

export default Cate;