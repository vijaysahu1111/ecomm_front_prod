import mongoose from '../db/conn.js';

let OrderSchema = mongoose.Schema({
    razorpay_order_id : String,
    razorpay_payment_id : String,
    razorpay_signature : String,
    user_id : { type : mongoose.Schema.Types.ObjectId, ref : "user"},
    product_id : { type : mongoose.Schema.Types.ObjectId, ref : "product"},
    date : { type : Date, default : new Date()}, // placed date
    date_shipped : {type : Date, default : null}, 
    date_received : {type : Date, default : null},
    date_canceled : {type : Date, default : null},
    amount : Number,
    address : String,
    invoice_num : String,
    status : {type : Number, default : 1},
    invoice_name : String,
    shipping : Number,
    // 1 - placed
    // 2 - shipped
    // 3 - received
    // 4 - cancle
})

let Order = mongoose.model("order", OrderSchema)

export default Order;