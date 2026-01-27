import mongoose from '../db/conn.js';
let SubCateSchema = mongoose.Schema({
    title : String,
    cate_id : { type : mongoose.Schema.Types.ObjectId, ref : "category" }
    
}, {timestamps : true})

const SubCate = mongoose.model("subcategory", SubCateSchema);

export default SubCate;