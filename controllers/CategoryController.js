import Cate from "../models/Category.js";
import SubCate from '../models/SubCategory.js'
import Product from '../models/Product.js'

let SaveCategory = async(req, res)=>{
    let result = await Cate.create(req.body);
    res.send({success:true, result});
}
let GetAllCategory = async(req, res)=>{
    let result = await Cate.find();
    res.send({success:true, result});
}
let GetByIdCategory = async(req, res)=>{

    let result = await Cate.find({_id : req.params.id});
    res.send({success:true, result:result[0]});
}
let UpdateCategory = async(req, res)=>{
    let result = await Cate.updateMany({_id : req.params.id}, req.body);
    res.send({success:true, result});
}
let DeleteCategory = async(req, res)=>{
    let result = await Cate.deleteMany({_id : req.params.id});
    let result2 = await SubCate.deleteMany({cate_id : req.params.id});
    let result3 = await Product.deleteMany({cate_id : req.params.id});

    res.send({success:true, result});
}








let GetAllCategoryWithSubCate = async(req, res)=>{
    let result = await Cate.find();
    let newresult = await Promise.all(
        result.map(async(item)=>{
            let arr = await SubCate.find({cate_id : item._id});
            // result.data = arr;
            return { category : item, subcate : arr};
        })
    )
    /*
    let newresult = result.map(async(item)=>{
        let arr = await SubCate.find({cate_id : item._id});
        return arr;
    })

    */
    res.send(newresult);
}




let DeleteAll = async(req, res)=>{
    await Cate.deleteMany();
    res.send("data deleted")
}

export {SaveCategory, DeleteAll, GetAllCategoryWithSubCate, UpdateCategory, DeleteCategory, GetAllCategory, GetByIdCategory}