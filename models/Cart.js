import mongoose from '../db/conn.js';
let CartSchema = mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId, ref : "user"},
    productId : { type : mongoose.Schema.Types.ObjectId, ref : "product"},
    
}, {timestamps : true})

const Cart = mongoose.model("cart", CartSchema);

export default Cart;