import Cart from "../models/Cart.js";

let SaveCartWithoutLogin = async(req, res)=>{
    
    let cartArr = req.body.cartArr;
    let uid = req.obj._id;
    let insertArr = cartArr.map(item=>{
        let obj = {userId : uid, productId : item._id};
        return obj;
    })
    await Cart.insertMany(insertArr);
    let result = await Cart.find({userId : uid}).populate("productId").exec();
    res.send({success:true, result});
}


let SaveCart = async(req, res)=>{
    // console.log(req.body);return;
    req.body.userId = req.obj._id;
    let result = await Cart.create(req.body);
    res.send({success:true, result});
}
let GetAllByUserIdCart = async(req, res)=>{
    let id = req.obj._id;
    let result = await Cart.find({userId : id}).populate("productId").exec();
    
    res.send({success:true, result});
}
let DeleteByIdCart = async(req, res)=>{
    let id = req.params.id;
    let result = await Cart.deleteMany({_id : id})
    res.send({success:true, result});
}
let DeleteAllByUserId = async(req, res)=>{
    let id = req.obj._id;
    let result = await Cart.deleteMany({userId : id});
    res.send({success:true, result});
}

export {SaveCart, DeleteAllByUserId, SaveCartWithoutLogin, DeleteByIdCart, GetAllByUserIdCart}