import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import ErrorToast from "../Utils/ErrorToast";

const RegisterPage = () => {

  // Variables ================================================================================

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("buyer");
  
  const [buyerData, setBuyerData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [sellerData, setSellerData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    storeName: "",
    storeCategory: "",
    storeDescription: "",
    businessAddress: "",
  });

  // ================================================================================
  // ================================================================================
  // ================================================================================

  // API ================================================================================

  const UserRegister = async (data) => {

    console.log("UserRegister Started");

    console.log(data);

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        data
      }, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
      });

      const result = response.data;
      console.log(result);

      if(result.code==1)
      {
        ErrorToast("an Account with this email already Exist")
      }
      else if(result.code==2)
      {
        navigate("/register/otp-confirm")
      }
      else if(result.code==3)
      {
        ErrorToast("Unexpected Error")
      }
    }
    catch(err) {
      console.log("myErr UserRegister API :=== " + err);
    }
    finally {
      console.log("UserRegister Ended");
    }

  };

  // ================================================================================
  // ================================================================================
  // ================================================================================

  // onChange ================================================================================

  const onChange = (e, role) => {
    const { name, value } = e.target;

    if (role === "buyer") {
      setBuyerData({ ...buyerData, [name]: value });
    } else {
      setSellerData({ ...sellerData, [name]: value });
    }
  };

  // ================================================================================
  // ================================================================================
  // ================================================================================

  // onSubmit ================================================================================

  const onSubmit = async (e, role) => {

    e.preventDefault();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    

    if (role === "buyer") {
      await UserRegister({...buyerData, role, otp});
    } else {
      await UserRegister({...sellerData, role, otp});
    }
  };

  // ================================================================================
  // ================================================================================
  // ================================================================================

  return (
    <>
    <Header/>

      <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[var(--c1)] via-[var(--c5)]/60 to-[var(--c1)]">
        <h1 className="text-4xl font-bold text-[var(--c3)] mb-8">Register</h1>

        <div className="mb-6 flex space-x-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === "buyer"
                ? "bg-[var(--c10)] text-white"
                : "bg-white text-[var(--c10)] border border-[var(--c10)]"
            }`}
            onClick={() => setActiveTab("buyer")}
          >
            Buyer
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === "seller"
                ? "bg-[var(--c10)] text-white"
                : "bg-white text-[var(--c10)] border border-[var(--c10)]"
            }`}
            onClick={() => setActiveTab("seller")}
          >
            Seller
          </button>
        </div>

        {/* Buyer Form */}
        {activeTab === "buyer" && (
          <form onSubmit={(e) => {onSubmit(e, "buyer")}}
            className="w-full max-w-xl p-10 bg-gradient-to-tr from-[var(--c12)] via-[var(--c5)] to-[var(--c12)] border-[3px] border-[var(--c3)] shadow-2xl rounded-3xl flex flex-col items-center"
          >
            <h2 className="text-4xl font-bold mb-10 text-[var(--c3)]">Buyer Registration</h2>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Full Name</label>
              <input type="text" name="fullName" value={buyerData.fullName} onChange={(e) => onChange(e, "buyer")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Email</label>
              <input type="email" name="email" value={buyerData.email} onChange={(e) => onChange(e, "buyer")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Password</label>
              <input type="password" name="password" autoComplete="new-password" value={buyerData.password} onChange={(e) => onChange(e, "buyer")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Phone</label>
              <input type="text" name="phone" value={buyerData.phone} onChange={(e) => onChange(e, "buyer")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Address</label>
              <input type="text" name="address" value={buyerData.address} onChange={(e) => onChange(e, "buyer")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-3 font-semibold rounded-xl transition duration-300 bg-[var(--c10)] text-white hover:bg-[var(--c11)]"
            >
              Register
            </button>
          </form>
        )}

        {/* Seller Form */}
        {activeTab === "seller" && (
          <form
            onSubmit={(e) => {onSubmit(e, "seller")}}
            className="w-full max-w-xl p-10 bg-gradient-to-tr from-[var(--c12)] via-[var(--c5)] to-[var(--c12)] border-[3px] border-[var(--c3)] shadow-2xl rounded-3xl flex flex-col items-center"
          >
            <h2 className="text-4xl font-bold mb-10 text-[var(--c3)]">Seller Registration</h2>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Full Name</label>
              <input type="text" name="fullName" value={sellerData.fullName} onChange={(e) => onChange(e, "seller")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Email</label>
              <input type="email" name="email" value={sellerData.email} onChange={(e) => onChange(e, "seller")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Password</label>
              <input type="password" name="password" autoComplete="new-password" value={sellerData.password} onChange={(e) => onChange(e, "seller")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Phone</label>
              <input type="text" name="phone" value={sellerData.phone} onChange={(e) => onChange(e, "seller")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Store Name</label>
              <input type="text" name="storeName" value={sellerData.storeName} onChange={(e) => onChange(e, "seller")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Store Category</label>
              <input type="text" name="storeCategory" value={sellerData.storeCategory} onChange={(e) => onChange(e, "seller")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Store Description</label>
              <input type="text" name="storeDescription" value={sellerData.storeDescription} onChange={(e) => onChange(e, "seller")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Business Address</label>
              <input type="text" name="businessAddress" value={sellerData.businessAddress} onChange={(e) => onChange(e, "seller")} className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]" />
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-3 font-semibold rounded-xl transition duration-300 bg-[var(--c10)] text-white hover:bg-[var(--c11)]"
            >
              Register
            </button>
          </form>
        )}
      </div>

      <Footer/>
    </>
  );
};

export default RegisterPage;