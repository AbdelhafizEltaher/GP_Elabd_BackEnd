const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
<<<<<<< HEAD
const cors = require('cors')
=======

>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9
const UserRoute = require('./Routes/UserRoute')
const ProductRoute = require('./Routes/ProductRoute')
const OrderRoute = require('./Routes/OrderRoute')
const CartRoute = require('./Routes/CartRoute')
const FavRoute = require('./Routes/FavRoute')
const CategorieRoute = require('./Routes/CategorieRoute')
const SubCategorieRoute = require('./Routes/SubCatRoute')
<<<<<<< HEAD
const Review = require('./Routes/Review')
=======
>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9

dotenv.config()
mongoose.connect(process.env.DB_URL)
mongoose.connection.on("connected", function () {
    console.log("Mongoose Connected to DB");
})
mongoose.connection.on("error", function (error) {
    console.log(error.message);
})
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose Connection is Disconnected");
})
process.on('SIGINT', async function () {
    await mongoose.connection.close()
    process.exit(0)
})
<<<<<<< HEAD

var app = express()
app.use(cors({
    origin:'*'
}))
=======
var app = express()
>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/elabdfoods/User',UserRoute)
app.use('/api/elabdfoods/Product',ProductRoute)
app.use('/api/elabdfoods/Order',OrderRoute)
app.use('/api/elabdfoods/Cart',CartRoute)
app.use('/api/elabdfoods/Fav',FavRoute)
app.use('/api/elabdfoods/Categorie',CategorieRoute)
app.use('/api/elabdfoods/SubCategorie',SubCategorieRoute)
<<<<<<< HEAD
app.use('/api/elabdfoods/Review',Review)
=======

>>>>>>> c64d820030ac9b9bcef0dce520d877917ad169a9

app.use('*', function (req, res, next) {
    res.status(302).redirect('/not-found');
});

app.listen(process.env.PORT | 3000, function () {
    console.log("successfully Listening");
})