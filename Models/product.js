const mongoose = require("mongoose")

var ProductSchema = mongoose.Schema({
<<<<<<< HEAD
        EnName: { type: String, required: true, toLowerCase: true, trim: true },
        ArName: { type: String, required: true, toLowerCase: true, trim: true },
        Image: { type: Object, required: true },
        Amount:{type: Number , default:1},
        Price: { type: Number },
        CategorieID: { type: mongoose.Schema.ObjectId,ref:"Categorie",required: true},
        SubCategID: {type: mongoose.Schema.ObjectId,ref:"SubCategorie" , nullable: true},
        NumberOfFav:{type:Number ,default:0},
        NumberOfCarts:{type:Number , default:0},
        NumberOfOrder:{type:Number , default:0},
=======
    
        EnName: { type: String, required: true, toLowerCase: true, trim: true },
        ArName: { type: String, required: true, toLowerCase: true, trim: true },
        Image: { type: String, required: true },
        Amount:{type: Number , default:1},
        Price: { type: Number },
        CategorieID: { type: mongoose.Schema.ObjectId,ref:"Categorie",required: true},
        SubCategID: {type: mongoose.Schema.ObjectId,ref:"SubCategorie"},
        NumberOfFav:{type:Number ,default:0},
        NumberOfCarts:{type:Number , default:0},


        

>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9
},    { timestamps: true })


var Product = mongoose.model("Product", ProductSchema)
module.exports = Product