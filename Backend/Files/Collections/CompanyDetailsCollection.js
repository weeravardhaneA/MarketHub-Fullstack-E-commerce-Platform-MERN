const mongoose = require("mongoose")

const CompanyDetailsSchema = new mongoose.Schema({

  _id: {type: String, required: true},

  name: {type: String, default: "Company Details", immutable: true, required: true},

  value: {type: String, required: true},

  type: {type: String, required: true}
  
})

const CompanyDetailsCollection = mongoose.model("CompanyDetailsCollection", CompanyDetailsSchema)

module.exports = CompanyDetailsCollection;