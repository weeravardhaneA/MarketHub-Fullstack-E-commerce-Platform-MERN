const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({

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

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;