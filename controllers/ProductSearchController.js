import Pro from '../models/Product.js';
import Category from '../models/Category.js'
import SubCate from '../models/SubCategory.js'
let FilterProduct = async(req, res)=>{
    
    let search_query = [];

    if(req.query.category){

        let cateName = req.query.category;
        let cateResult = await Category.find({title : cateName});
        let obj = {cate_id : cateResult[0]._id};
        search_query.push(obj);
        if(req.query.subcategory){
            let subCateResult = await SubCate.find({title : req.query.subcategory});
            let obj2 = {sub_cate_id : subCateResult[0]._id};
            search_query.push(obj2)
        }
    }
    

    if(req.query.discount){ // when discount come
        let obj = {discount : {$gte : parseInt(req.query.discount)}};
        search_query.push(obj)
    }
    if(req.query.min){ // when price come
        let obj = {$and : [{price : {$gte : parseInt(req.query.min)}}, {price : {$lte : parseInt(req.query.max)}}]};
        // console.log({price : {$gte : parseInt(req.query.min)}}, {price : {$lte : parseInt(req.query.max)}})
        search_query.push(obj)
    }
    if(req.query.color){
        let obj = {color : req.query.color};
        search_query.push(obj)
    }
    if(req.query.size){
        let obj = {size : req.query.size};
        search_query.push(obj);
    }

    let result = await Pro.find({$and : search_query});    
    res.send({success:true, result:result});

}

export {FilterProduct};