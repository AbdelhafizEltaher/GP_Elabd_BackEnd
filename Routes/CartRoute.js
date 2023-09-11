const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const { addToCart, removeFromCart, GetAllCArts } = require('../Controlers/cartControlers')
const { VerfiyUser, VerfiyAuthorization } = require('../Controlers/Auth')
const Product = require('../Models/product')
const User = require('../Models/user')
=======
const {addToCart , removeFromCart , GetAllCArts}= require('../Controlers/cartControlers')
const {VerfiyUser, VerfiyAuthorization} = require('../Controlers/Auth')
const Product= require('../Models/product')
const User= require('../Models/user')
>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9


// Make Order for only registered Users
router.post("/", VerfiyUser, async function (request, response, next) {
    try {
        const product = await Product.findById(request.body.ProductID)
        const user = await User.findById(request.User.id)
<<<<<<< HEAD
        if (product && user) {
            const newCart = await addToCart(request.User.id, request.body)
            if (newCart) {
                response.status(202).json(newCart)

            }
            else {
                response.status(401).json("This Product Already In Your Cart")

            }
        }
        else {
=======
        if(product && user){
            const newCart = await addToCart(request.User.id,request.body)
        response.status(200).json(newCart)
        }
        else{
>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9
            response.status(401).json("Product id Or User Id Incorrect")
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.delete("/:id", VerfiyUser, async function (request, response, next) {

    try {
<<<<<<< HEAD
        const DeletMessag = await removeFromCart(request.params.id, request.User.id)
        response.status(200).json(DeletMessag)

    } catch (err) {
        response.status(401).json(err.message)
    }
})

router.get("/", VerfiyUser, async function (request, response, next) {
    try {
        const Results = await GetAllCArts(request.User.id)
        if (Results) {
            response.status(200).json(Results)

        }
        else {
=======
       const DeletMessag = await removeFromCart(request.params.id , request.User.id)
       response.status(200).json(DeletMessag)
 
    } catch (err) {
       response.status(401).json(err.message)
    }
 })

 router.get("/",VerfiyUser,async function(request,response,next){
    try{
        const Results = await GetAllCArts(request.User.id)
        if(Results){
            response.status(200).json(Results)

        }
        else{
>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9
            response.status(401).json("Incorrect id")

        }

    }
<<<<<<< HEAD
    catch (error) {
        response.status(401).json(err.message)
    }
})

module.exports = router
=======
    catch(error){
        response.status(401).json(err.message)
    }
 })

module.exports=router
>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9
