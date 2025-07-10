const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const UserRegisterAPI = require("./Files/API/UserAPI/UserRegisterAPI")
const UserLoginAPI = require("./Files/API/UserAPI/UserLoginAPI")
const AuthProviderAPI = require("./Files/API/UserAPI/AuthProviderAPI")
const StoreCreateAPI = require("./Files/API/SellerAPI/StoreCreateAPI")
const GetStoresDataAPI = require("./Files/API/UserAPI/GetStoresDataAPI")

const connect = async () => {

  try
  {
    await mongoose.connect(process.env.MONGODB_URI)
    
    app.use(cors({
      origin: "http://localhost:5173",
      credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
    
    app.use("/api/user/register", UserRegisterAPI);
    app.use("/api/user/login", UserLoginAPI);
    app.use("/api/user/auth-provider", AuthProviderAPI);
    app.use("/api/user/get-stores-data", GetStoresDataAPI);

    app.use("/api/seller/store-create", StoreCreateAPI);
    
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