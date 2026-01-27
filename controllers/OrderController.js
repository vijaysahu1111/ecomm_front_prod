import { RAZORPAY_KEY, RAZORPAY_SECRET } from '../config/config.js';
import Razorpay from 'razorpay'
import User from '../models/User.js'
import Order from '../models/Order.js';
import Product from '../models/Product.js'
import fs from 'fs'

import pdfnode from 'pdf-creator-node';
import path from 'path'
import { UniqueString } from 'unique-string-generator'



let rzpy = new Razorpay({
    key_id : RAZORPAY_KEY,
    key_secret : RAZORPAY_SECRET
})
let Checkout = async(req, res)=>{
    // console.log(req.body);
    let {amount} = req.body;
    try{
        const order = await rzpy.orders.create({
            amount : amount*100,
            currency : 'INR'
        });
        res.send({success:true, orderId : order.id})
    }catch(err){
        
        res.send({success:false})
    }
}

let ConfirmOrder = async(req, res)=>{
    let in_num_a = Math.floor(1000 + Math.random() * 9000); // 4698
    in_num_a = String(in_num_a);
    let in_num = null;
    let old_order = await Order.find();
    if(old_order.length == 0){
        let x = 1001;
        in_num = in_num_a + x;
    }else{
        let last_order = old_order[old_order.length-1];
        // String()
        // parseInt
        let last_in = String(last_order.invoice_num); // "45141003"
        let remvoe_4_digit = last_in.slice(4, last_in.length); // 1003
        let last_in_num = parseInt(remvoe_4_digit);
        last_in_num++; // 1004
        in_num = in_num_a + last_in_num; // 46981004
                
    }
    let user_result = await User.find({_id : req.body.user_id});
    let pro_result = await Product.find({_id : req.body.product_id});
    req.body.invoice_num = in_num;
    let invoice_name = UniqueString()+".pdf";
    req.body.invoice_name = invoice_name;
                
    let dis = pro_result[0].price * pro_result[0].discount / 100;
    let f_amount = pro_result[0].price - dis + pro_result.shipping;
    // console.log(req.body);return;
    let result = await Order.create(req.body);
    const html = fs.readFileSync('template.html', 'utf8');
    
        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
            header: {
                height: '15mm',
                contents: `<div class="invoice-box">
                <table cellpadding="0" cellspacing="0">
                    <tr class="top">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td class="title">
                                        <h3>KAIRA</h3>
                                    </td>
    
                                    <td>
                                        Invoice #: ${in_num}<br />
                                        Created: ${new Date()}<br />
                                        Due: ${new Date()}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
    
                    <tr class="information">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td>
                                        303, Gold Start Building<br />
                                        M. G. Road<br />
                                        Indore, MP 452001
                                    </td>
    
                                    <td>
                                        ${user_result[0].name}<br />
                                        ${user_result[0].email}<br />
                                        ${req.body.address}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
    
                    <tr class="heading">
                        <td>Payment Method</td>
    
                        <td>Online #</td>
                    </tr>
    
                    <tr class="details">
                        <td>Online</td>
    
                        <td>${req.body.amount}</td>
                    </tr>
    
                    <tr class="heading">
                        <td>Item</td>
    
                        <td>Price</td>
                    </tr>
    
                    <tr class="item">
                        <td>${pro_result[0].title}</td>
    
                        <td>&#8377; ${pro_result[0].price}</td>
                    </tr>
    
                    <tr class="item">
                        <td>Discount</td>
    
                        <td>- &#8377; ${dis}</td>
                    </tr>
    
                    <tr class="item last">
                        <td>Shipping</td>
    
                        <td>+  &#8377; 150</td>
                    </tr>
    
                    <tr class="total">
                        <td></td>
    
                        <td>Total: &#8377; ${f_amount}</td>
                    </tr>
                </table>
            </div>`
            }
        };
    
        const document = {
            html: html,
            path: path.resolve()+`/assets/invoices/${invoice_name}`,
            type: '', // Can be 'buffer', 'stream', or empty for file
        };
    
        pdfnode.create(document, options)
            .then(result2 => {
                
                res.send({success:true, result});
            })
            .catch(error => {
                 res.send({success:false})
                
            });

}
let GetAllOrder = async(req, res)=>{
    let result = await Order.find().populate("user_id").populate("product_id").sort({"date" : -1}).exec();
    res.send(result);
}
let GetAllPlacedOrder = async(req, res)=>{
    let result = await Order.find({status : 1}).populate("user_id").populate("product_id").exec();
    res.send(result);
}
let GetAllShippedOrder = async(req, res)=>{
    let result = await Order.find({status : 2}).populate("user_id").populate("product_id").exec();
    res.send(result);
}
let GetAllReceivedOrder = async(req, res)=>{
    let result = await Order.find({status : 3}).populate("user_id").populate("product_id").exec();
    res.send(result);
}
let GetAllCancledOrder = async(req, res)=>{
    let result = await Order.find({status : 4}).populate("user_id").populate("product_id").exec();
    res.send(result);
}




let GetAllByUserId = async(req, res)=>{
    // console.log(req.obj);return;
    let result = await Order.find({user_id : req.obj._id}).populate("product_id").exec()
    res.send({success:true, result});
}

let DeleteAllOrder = async(req, res)=>{
    await Order.deleteMany();
    res.send({success:true})
}
let CountOrder = async(req, res)=>{
    let total = await Order.countDocuments();   
    res.send({success:true, total});
}
let CountPendingOrder = async(req, res)=>{
    let total = await Order.countDocuments({ status : 1 });   
    res.send({success:true, total});
}

let UpdateOrderStatusById = async(req, res)=>{
    let id = req.params.id;
    let result = await Order.updateMany({_id : id }, req.body);
    res.send({success : true, result});
}


let ChangeOrderStatus = async(req, res)=>{
   let id = req.params.id;
   let obj = {};
   if(req.body.status==2){
    obj.status = 2;
    obj.date_shipped = new Date();
   }
   if(req.body.status==3){
        obj.status = 3;
    obj.date_received = new Date();
   }
   if(req.body.status==4){
        obj.status = 4;
    obj.date_canceled = new Date();
   }

   let result = await Order.updateMany({_id : id}, obj);
   res.send({success:true, result});
}

export {
    Checkout, 
    UpdateOrderStatusById, 
    CountOrder, 
    CountPendingOrder, 
    ConfirmOrder, 
    GetAllOrder, 
    GetAllByUserId, 
    DeleteAllOrder,
    GetAllPlacedOrder,
    GetAllCancledOrder,
    GetAllReceivedOrder,
    GetAllShippedOrder,
    ChangeOrderStatus
}

/*

var a = 10;
a = 20;
var a = 30;


let a = 10;
a = 20;
let a = 30;


*/