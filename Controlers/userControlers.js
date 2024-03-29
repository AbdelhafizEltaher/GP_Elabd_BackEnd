const User = require('../Models/user')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

async function Register(RequestData) {
    const newUser = new User({
        FirstName: RequestData.FirstName,
        LastName: RequestData.LastName,
        Email: RequestData.Email,
        Password: RequestData.Password,
        Gender: RequestData.Gender,
        MobileNumber: RequestData.MobileNumber,
    })
    return newUser.save()
}

async function Login(RequestData) {

    const StoredUser = await User.findOne({ Email: RequestData.Email })
    if (StoredUser === null) {
        return { status: 401, result: "InCorrect Email" }
    }
    else {
        const VerifyPassword = bcrypt.compareSync(RequestData.Password, StoredUser.Password)
        if (VerifyPassword === false) {
            return { status: 401, result: "InCorrect Password" }
        }
        else {
            const { Password, IsAdmin,NumberOFLogin,IsActive ,...others } = StoredUser._doc
            const AccessToken = jwt.sign({
                id: StoredUser.id, IsAdmin: StoredUser.IsAdmin, FirstName: StoredUser.FirstName
            }, process.env.SECRET_KEY, {
                expiresIn: "24h"
            })
         await User.findByIdAndUpdate(StoredUser.id,{$set:{"NumberOFLogin":StoredUser.NumberOFLogin+1 , "IsActive": true}})
            return { status: 200, result: { ...others, AccessToken } }
        }
    }
}

async function UpdateUserData(userID, data) {
 return await User.findByIdAndUpdate(userID, { $set: data, }, { new: true, runValidators: true })
}

async  function logOut(userID){
        return await User.findByIdAndUpdate(userID,{$set:{IsActive:false}})  
}

async function UpdateUserPassword(userID, data) {

        var salt =  bcrypt.genSaltSync(10)
        var hashdata = bcrypt.hashSync(data.Password, salt)
        data.Password = hashdata
        return await User.findByIdAndUpdate(userID, { $set: data, }, { new: true, runValidators: true })


}

async function DeletUser(userID) {
    const admin = await User.findOne({ IsAdmin: true })
    const user = await User.findById(userID)
    console.log(user);
    if (user == null) {
        return "InCorrrect ID"

    }
    else if (admin.id === userID) {
        return "You Can't Delet Admin Account"

    }
    else {

        await User.findByIdAndDelete(userID)
        return "User Has Been Deleted"
    }

}

async function GetUserByID(userID) {
    return await User.findById(userID)
}

async function GetAllUser(newOption, skip, limit) {
    if (newOption) {
        return await User.find().sort({ _id: -1 }).limit(limit)
    }
    else {
        if (skip) {
            return await User.find().skip(skip).limit(limit)
        }
        else {
            return await User.find()
        }
    }
}

async function GetNumberOfLogin(userID){

    const user = await User.findById(userID)
    if(user){
        return user.NumberOFLogin
    }
    else{
        return null
    }
}

async function GetUsersStats() {
    const date = new Date()
    const LastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    return await User.aggregate([
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


module.exports = { Register, Login, UpdateUserData, DeletUser, GetUserByID, GetAllUser, GetUsersStats , UpdateUserPassword , GetNumberOfLogin , logOut}