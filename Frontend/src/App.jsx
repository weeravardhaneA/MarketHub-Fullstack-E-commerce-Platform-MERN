import { useState } from "react";

const App = () => {
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

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "buyer") {
      setBuyerData({ ...buyerData, [name]: value });
    } else {
      setSellerData({ ...sellerData, [name]: value });
    }
  };

  const handleSubmit = (type) => {
    if (type === "buyer") {
      console.log("Buyer Data:", buyerData);
    } else {
      console.log("Seller Data:", sellerData);
    }
  };

  return (
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit("buyer");
          }}
          className="w-full max-w-xl p-10 bg-gradient-to-tr from-[var(--c12)] via-[var(--c5)] to-[var(--c12)] border-[3px] border-[var(--c3)] shadow-2xl rounded-3xl flex flex-col items-center"
        >
          <h2 className="text-4xl font-bold mb-10 text-[var(--c3)]">Buyer Registration</h2>
          <Input label="Full Name" name="fullName" value={buyerData.fullName} onChange={(e) => handleChange(e, "buyer")} />
          <Input label="Email" name="email" type="email" value={buyerData.email} onChange={(e) => handleChange(e, "buyer")} />
          <Input label="Password" name="password" type="password" value={buyerData.password} onChange={(e) => handleChange(e, "buyer")} />
          <Input label="Phone" name="phone" value={buyerData.phone} onChange={(e) => handleChange(e, "buyer")} />
          <Input label="Address" name="address" value={buyerData.address} onChange={(e) => handleChange(e, "buyer")} />
          <SubmitButton />
        </form>
      )}

      {/* Seller Form */}
      {activeTab === "seller" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit("seller");
          }}
          className="w-full max-w-xl p-10 bg-gradient-to-tr from-[var(--c12)] via-[var(--c5)] to-[var(--c12)] border-[3px] border-[var(--c3)] shadow-2xl rounded-3xl flex flex-col items-center"
        >
          <h2 className="text-4xl font-bold mb-10 text-[var(--c3)]">Seller Registration</h2>
          <Input label="Full Name" name="fullName" value={sellerData.fullName} onChange={(e) => handleChange(e, "seller")} />
          <Input label="Email" name="email" type="email" value={sellerData.email} onChange={(e) => handleChange(e, "seller")} />
          <Input label="Password" name="password" type="password" value={sellerData.password} onChange={(e) => handleChange(e, "seller")} />
          <Input label="Phone" name="phone" value={sellerData.phone} onChange={(e) => handleChange(e, "seller")} />
          <Input label="Store Name" name="storeName" value={sellerData.storeName} onChange={(e) => handleChange(e, "seller")} />
          <Input label="Store Category" name="storeCategory" value={sellerData.storeCategory} onChange={(e) => handleChange(e, "seller")} />
          <Input label="Store Description" name="storeDescription" value={sellerData.storeDescription} onChange={(e) => handleChange(e, "seller")} />
          <Input label="Business Address" name="businessAddress" value={sellerData.businessAddress} onChange={(e) => handleChange(e, "seller")} />
          <SubmitButton />
        </form>
      )}
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div className="w-full mb-6">
    <label className="block text-lg font-medium mb-2 text-[var(--c6)]">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]"
    />
  </div>
);

const SubmitButton = () => (
  <button
    type="submit"
    className="mt-6 px-6 py-3 font-semibold rounded-xl transition duration-300 bg-[var(--c10)] text-white hover:bg-[var(--c11)]"
  >
    Register
  </button>
);

export default App;
