import mongoose from '../db/conn.js';
let CitySchema = mongoose.Schema({
    id : String,
    name : String,
    state : String
}, {collection : "city"})

let City = mongoose.model("city", CitySchema);

export default City;