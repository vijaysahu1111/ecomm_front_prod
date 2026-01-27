import express from 'express'
import { GetAllCity, TotalCity } from '../controllers/Pagination.js';

let routes = express.Router();
// api/v1/pagination/1/100
// api/v1/pagination/2/100
// api/v1/pagination/7/100


// api/v1/pagination/5/50

routes.get("/total", TotalCity);
routes.get("/:num/:total", GetAllCity)

export default routes;


/*
    1    --------- .find().skip(0).limit(100)
    2    --------- .find().skip(100).limit(100)
    3    --------- .find().skip(300).limit(100)
    
    
    7    --------- .find().skip(600).limit(100)

    9               .find().skip(800).limit(100)
    
    
    
    5               .find().skip(200).limit(50)

*/