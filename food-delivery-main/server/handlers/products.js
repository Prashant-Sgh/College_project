import {Product} from "../models/product.js"

/**
 * Retrieves paginated products from the database
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.pages=1] - Page number for pagination
 * @param {number} [req.query.limit=6] - Number of items per page
 * @param {Response} res - Express response object
 * @returns {Promise<void>} 
 * @throws {Error} When product retrieval fails
 */
export async function getProducts(req,res){
    try{
        const page=req.query.pages||1; //start 1*6-6=0, end=1*6-1=5
        const limit=req.query.limit||6;
        const startIndex=(page-1)*limit;
        const endIndex=page*limit;

        const products=await Product.find().sort({_id:-1}).limit(limit).skip(startIndex).exec();
        const total=await Product.countDocuments();

        const pagination={};
        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit:limit
            }
        }
        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit:limit
            }
        }
        res.status(200).json({data:products,pagination:pagination,message:"success"});

    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}


/**
 * Creates a new product in the database
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing product data
 * @param {string} req.body.name - Name of the product
 * @param {number} req.body.price - Price of the product
 * @param {string} req.body.description - Description of the product
 * @param {string} req.body.image - Image URL of the product
 * @param {string} req.body.category - Category of the product
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} When product creation fails
 */
export async function createProduct(req,res){
    try{
        const product=await Product.create(req.body);
        res.status(200).json({data:product,message:"success"});
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}



//pending product update and delete functionality 
