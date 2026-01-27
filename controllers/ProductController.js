import Product from "../models/Product.js";
import Category from '../models/Category.js'
import SubCate from '../models/SubCategory.js'
import Path from 'path'
import { UniqueString } from 'unique-string-generator'

let SaveProduct = async(req, res)=>{
    let result = await Product.create(req.body);
    res.send({success:true, result});
}
let GetAllProduct = async(req, res)=>{
    let result = await Product.find().sort({_id : -1});
    res.send({success:true, result});
}
let GetByIdProduct = async(req, res)=>{

    let result = await Product.find({_id : req.params.id}).populate("cate_id").populate("sub_cate_id").exec();
    res.send({success:true, result:result[0]});
}
let UpdateProduct = async(req, res)=>{
    let result = await Product.updateMany({_id : req.params.id}, req.body);
    res.send({success:true, result});
}
let DeleteProduct = async(req, res)=>{
    let result = await Product.deleteMany({_id : req.params.id});
    res.send({success:true, result});
}
let DeleteAll = async(req, res)=>{
    await Product.deleteMany();
    res.send("data deleted")
}

let GetAllProCateSubCate = async(req, res)=>{
    
    let catename = req.params.cate; // bags
    let cateresult = await Category.find({title : catename});
    let cateid = cateresult[0]._id;

    if(req.params.subcate){
        let subcatename = req.params.subcate;
        let subcateresult = await SubCate.find({title : subcatename});
        let subcateid = subcateresult[0]._id;

        let result = await Product.find({$and : [{cate_id : cateid}, {sub_cate_id : subcateid}]});
        res.send({success:true, result})
        
    }else{
        let result = await Product.find({cate_id : cateid});
        res.send({success:true, result})
    }
}

let CountProduct = async(req, res)=>{
    let total = await Product.countDocuments();   
    res.send({success:true, total});
}


let GetAllLatestCollProduct = async(req, res)=>{
     const results = await Product.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$cate_id",
        latestProduct: { $first: "$$ROOT" }
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id", 
        foreignField: "_id",
        as: "category"
      }
    },
    {
      $lookup: {
        from: "subcategories",
        localField: "latestProduct.sub_cate_id",
        foreignField: "_id",
        as: "subcategory"
      }
    }
  ]).exec();
    res.send({success: true, result : results});
}

let UploadImage = async(req, res)=>{
  // console.log(req.params);
  // console.log(req.files);

  let id = req.params.id;
  let photo = req.files.image;
  let oldname = photo.name;
  let arr = oldname.split(".");
  let ext = arr[arr.length-1];
  let newname = UniqueString()+"."+ext;
  // console.log(newname);return;
  photo.mv(Path.resolve()+"/assets/product_images/"+newname, async(err)=>{
    await Product.updateMany({_id : id}, {image : newname})
    res.send({success:true, name : newname})
  })
}
export {SaveProduct,UploadImage, GetAllLatestCollProduct, CountProduct, DeleteAll, GetAllProCateSubCate, UpdateProduct, DeleteProduct, GetAllProduct, GetByIdProduct}

/*
MongoDB --- DB Engine --- Queries --- 
Mongoose --- Function



MongoDB ---- deleteMany({city : "indore"}), deleteOne({city : "indore"}), deleteLast, deleteFirst

*/