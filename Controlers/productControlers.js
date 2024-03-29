const Product = require('../Models/product')

async function AddNewProduct(RequestData) {
    const newProduct = new Product({
        EnName: RequestData.EnName,
        ArName: RequestData.ArName,
        Image: RequestData.Image,
        Amount: RequestData.Amount,
        Price: RequestData.Price,
        CategorieID: RequestData.CategorieID,
        SubCategID: RequestData.SubCategID,
    })
    console.log(newProduct);
    return newProduct.save()
}

async function UpdateProduct(ProductId, Data) {
    return await Product.findByIdAndUpdate(ProductId, { $set: Data, }, { new: true, runValidators: true })
}

async function GetAllProducts(skip, limit, EnName, ArName, minprice, maxprice, CatID , SubCatID) {
  
    if (skip) {
        return await Product.find().skip(skip).limit(limit).populate('CategorieID', " CatArName CatEnName").populate('SubCategID', "ArsubCatName EnsubCatName ")
    }
    if (EnName) {

        const prd = await Product.find({ "EnName":{ $regex: EnName}  }).populate('CategorieID', " CatArName CatEnName").populate('SubCategID', "ArsubCatName EnsubCatName ")
        return prd
    }
    if (ArName) {

        const prd = await Product.find({ "ArName": { $regex: ArName} }).populate('CategorieID', " CatArName CatEnName").populate('SubCategID', "ArsubCatName EnsubCatName ")
        return prd
    }
    if (minprice) {

        return await Product.find({Price: { $gt: minprice}}).populate('CategorieID', " CatArName CatEnName").populate('SubCategID', "ArsubCatName EnsubCatName ")
    }
    if (maxprice) {

        return await Product.find({ Price: { $lt: maxprice } }).populate('CategorieID', " CatArName CatEnName").populate('SubCategID', "ArsubCatName EnsubCatName ")
    }

    else if(CatID){
        return await Product.find({ "CategorieID": CatID}).populate('CategorieID', " CatArName CatEnName").populate('SubCategID', "ArsubCatName EnsubCatName ")
    }
    if (SubCatID){
        
        return await Product.find({ "SubCategID": SubCatID}).populate('CategorieID', " CatArName CatEnName").populate('SubCategID', "ArsubCatName EnsubCatName ")

    }
    else {
        return await Product.find().populate('CategorieID', " CatArName CatEnName").populate('SubCategID', "ArsubCatName EnsubCatName ")
    }
}

async function GetProductById(ProductId) {
    return await Product.findById(ProductId)
}

async function DeletProducById(ProductId) {
    let ProductData = await Product.findById(ProductId)
    if (ProductData == null) {
        console.log(ProductData)
        return "Incorrect Product Id"

    } else {
        await Product.deleteOne(ProductData)
        return "Product Deleted Successfuly"
    }
}

async function GetProductsStats() {
    const date = new Date()
    const LastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    return await Product.aggregate([
        {
            $match: { createdAt: { $gte: LastYear } }
        },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: { _id: "$month", total: { $sum: 1 } }
        }

    ])

}
module.exports = { AddNewProduct, UpdateProduct, GetAllProducts, GetProductById, DeletProducById, GetProductsStats }