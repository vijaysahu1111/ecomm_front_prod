import City from "../models/City.js";

let GetAllCity = async(req, res)=>{
    let num = req.params.num; // 1
    let total = req.params.total; // 100
    let skip = (num-1)*total;
    let result = await City.find().skip(skip).limit(total);
    res.send(result);
}


let TotalCity = async(req, res)=>{
    let total = await City.countDocuments();
    res.send({total : total});
}
export {GetAllCity, TotalCity};

/*
    .find().skip(0).limit(100)


*/