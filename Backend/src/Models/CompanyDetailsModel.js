const mongoose = require("mongoose")

const CompanyDetailsSchema = new mongoose.Schema({

  _id: {type: String, required: true},

  name: {type: String, default: "Company Details", immutable: true, required: true},

  value: {type: String, required: true},

  type: {type: String, required: true}
  
})

const CompanyDetailsModel = mongoose.model("CompanyDetails", CompanyDetailsSchema)

module.exports = CompanyDetailsModel;