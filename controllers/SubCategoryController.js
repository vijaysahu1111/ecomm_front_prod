import SubCate from "../models/SubCategory.js";
import Product from '../models/Product.js'

let SaveSubCategory = async(req, res)=>{
    let result = await SubCate.create(req.body);
    res.send({success:true, result});
}
let GetAllSubCategory = async(req, res)=>{
    let result = await SubCate.find().populate("cate_id").exec();
    res.send({success:true, result});
}
let GetByIdSubCategory = async(req, res)=>{

    let result = await SubCate.find({_id : req.params.id});
    res.send({success:true, result:result[0]});
}
let UpdateSubCategory = async(req, res)=>{
    let result = await SubCate.updateMany({_id : req.params.id}, req.body);
    res.send({success:true, result});
}
let DeleteSubCategory = async(req, res)=>{
    let result = await SubCate.deleteMany({_id : req.params.id});
    let result2 = await Product.deleteMany({sub_cate_id : req.params.id});
    res.send({success:true, result});
}

let GetAllSubCategoryByCateId = async(req, res)=>{
    // console.log(req.params);
    let cateid = req.params.id;
    let result = await SubCate.find({cate_id : cateid});
    res.send({success:true, result});

}



let DeleteAll = async(req, res)=>{
    await SubCate.deleteMany();
    res.send("data deleted")
}

export {SaveSubCategory, DeleteAll, GetAllSubCategoryByCateId, UpdateSubCategory, DeleteSubCategory, GetAllSubCategory, GetByIdSubCategory}