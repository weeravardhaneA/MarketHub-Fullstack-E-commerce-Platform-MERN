const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const UserRegisterAPI = require("./src/APIs/UserAPI/UserRegisterAPI")
const UserLoginAPI = require("./src/APIs/UserAPI/UserLoginAPI")
const AuthProviderAPI = require("./src/APIs/UserAPI/AuthProviderAPI")
const StoreCreateAPI = require("./src/APIs/SellerAPI/StoreCreateAPI")
const GetStoresDataAPI = require("./src/APIs/UserAPI/GetStoresDataAPI")
const UpdateDetails = require("./src/APIs/AdminAPI/UpdateDetails")
const GetDetails = require("./src/APIs/AdminAPI/GetDetails")

const connect = async () => {

  try
  {
    await mongoose.connect(process.env.MONGODB_URI)
    
    app.use(cors({
      origin: process.env.FRONTEND_ORIGIN,
      credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
    
    app.use("/api/user/register", UserRegisterAPI);
    app.use("/api/user/login", UserLoginAPI);
    app.use("/api/user/auth-provider", AuthProviderAPI);
    app.use("/api/user/get-stores-data", GetStoresDataAPI);

    app.use("/api/seller/store-create", StoreCreateAPI);

    app.use("/api/admin/get-details", GetDetails);
    app.use("/api/admin/update-details", UpdateDetails);
    
    app.listen(process.env.PORT || 5000);
    console.log("Connected");
  }
  catch(err)
  {
    console.log("Not Connected");
    console.log("Err connect :=== " + err);
  }

}

connect();