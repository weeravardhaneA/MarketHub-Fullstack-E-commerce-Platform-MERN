const mongoose = require("mongoose")

const UsersModelSchema = new mongoose.Schema({

  fullName: {type: String,},

  email: {type: String,},
  
  password: {type: String,},
  
  phone: {type: String,},
  
  address: {type: String,},
  
  stores: [{
    name: { type: String,},
    category: { type: String,},
    description: { type: String,},
    imageUrl: {type: String}
  }],
  
  businessAddress: {type: String,},
  
  role: {type: String},
  
  refreshToken: {type: String},
  
  createdAt: {type: Date, default: Date.now}

})

const UsersModel = mongoose.model("Users", UsersModelSchema);

module.exports = UsersModel;