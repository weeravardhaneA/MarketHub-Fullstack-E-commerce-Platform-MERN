const mongoose = require("mongoose")

const TempUsersModelModelSchema = new mongoose.Schema({

  fullName: {type: String,},

  email: {type: String,},

  password: {type: String,},

  phone: {type: String,},

  address: {type: String,},

  storeName: {type: String,},

  storeCategory: {type: String,},

  storeDescription: {type: String,},

  businessAddress: {type: String,},

  role: {type: String},

  otp: {type: String},

  token: {type: String},
  
  createdAt: {type: Date, default: Date.now, expires: 300}

})

const TempUsersModelModel = mongoose.model("TempUsersModel", TempUsersModelModelSchema);

module.exports = TempUsersModelModel;