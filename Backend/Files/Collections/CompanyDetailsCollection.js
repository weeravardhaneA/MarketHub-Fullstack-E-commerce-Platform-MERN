const mongoose = require("mongoose")

const CompanyDetailsSchema = new mongoose.Schema({

  name: {type: String, default: "Company Details", immutable: true},

  value: {type: String, required: true}
  
})