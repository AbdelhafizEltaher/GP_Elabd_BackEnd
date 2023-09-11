const mongoose = require("mongoose")
var Categschema = mongoose.Schema({

    CatArName: {type: String,required: true},

    CatEnName:{type: String,required: true},

<<<<<<< HEAD
    CatArSize: {type: [String],required: true},

    CatEnSize:{type: [String],required: true},   

=======
>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9
    SubCategorieID :[{SubCat:{type: mongoose.Schema.ObjectId,ref:"SubCategorie",required: true}}]
},

      { timestamps: true })


var Categorie = mongoose.model("Categorie", Categschema)
module.exports = Categorie