const mongoose = require("mongoose")

var ProductSchema = mongoose.Schema({
    
        EnName: { type: String, required: true, toLowerCase: true, trim: true },
        ArName: { type: String, required: true, toLowerCase: true, trim: true },
        Image: { type: String, required: true },
        Amount:{type: Number , default:1},
        Price: { type: Number },
        CategorieID: { type: mongoose.Schema.ObjectId,ref:"Categorie",required: true},
        SubCategID: {type: mongoose.Schema.ObjectId,ref:"SubCategorie"},
        NumberOfFav:{type:Number ,default:0},
        NumberOfCarts:{type:Number , default:0},


        

},    { timestamps: true })


var Product = mongoose.model("Product", ProductSchema)
module.exports = Product