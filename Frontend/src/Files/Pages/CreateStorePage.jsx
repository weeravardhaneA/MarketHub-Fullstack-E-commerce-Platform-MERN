import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import axios from "axios";

const CreateStorePage = () => {

  // Variables ===================================================================
  
  const navigate = useNavigate();
  const [StoreName, setStoreName] = useState("");
  const [StoreDescription, setStoreDescription] = useState("");
  const [error, setError] = useState("");
  const [storeImagePreview, setStoreImagePreview] = useState(null);
  const [Base64String, setBase64String] = useState("")
  const [StoreImageUrl, setStoreImageUrl] = useState("")

  // ===================================================================
  // ===================================================================
  // ===================================================================

  // API ===================================================================

  const StoreCreateAPI = async () => {

    console.log("= = = = = StoreCreateAPI Started = = = = =");

    try
    {
      const response = await axios.post("http://localhost:5000/api/seller/store-create", {

        StoreName,
        StoreDescription,
        StoreImageUrl

      },{

        headers: {"Content-Type": "application/json"},
        withCredentials: true

      })

      const result = response.data;
      console.log(result);

    }
    catch(err)
    {
      console.log("myErr StoreCreateAPI :=== " + err);
    }
    finally
    {
      console.log("= = = = = StoreCreateAPI Ended = = = = =");
    }

  }


  const UploadImageAPI = async () => {

    console.log("= = = = = UploadImageAPI Started = = = = =");

    try
    {
      const form = new FormData()
      form.append("key", "5549e2e0df7dcd15e173aad18173b4aa")
      form.append("image", Base64String)

      const response = await axios.post("https://api.imgbb.com/1/upload",form)

      const result = await response.data

      if(result?.data?.url)
      {
        console.log("Url is " + result.data.url)
        setStoreImageUrl(result.data.url)
      }
    }
    catch(err)
    {
      console.log("myErr UploadImageAPI :=== " + err);
    }
    finally
    {
      console.log("= = = = = UploadImageAPI Ended = = = = =");
    }
  }

  // ===================================================================
  // ===================================================================
  // ===================================================================


  // onChange ===================================================================

  const onImageChange = (e) => {

    const file = e.target.files[0]
    let reader;

    if(file)
    {
      setStoreImagePreview(URL.createObjectURL(file))
      reader = new FileReader()
    }

    reader.onloadend = () => {

      const base64fullstring = reader.result
      const base64string = base64fullstring.split(",")[1]
      setBase64String(base64string)

    }

    reader.readAsDataURL(file)
  }

  // ===================================================================
  // ===================================================================
  // ===================================================================



  // onSubmit ===================================================================

  const onSubmit = async (e) => {
    
    e.preventDefault();
    
    if (!StoreName || !StoreDescription) {
      setError("Please fill in all fields.");
      return;
    }
    else
    {
      await UploadImageAPI();
      await StoreCreateAPI();
    }

    console.log("Store Created:", { StoreName, StoreDescription });
    // navigate("/stores");

  };

  // ===================================================================
  // ===================================================================
  // ===================================================================

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 border border-yellow-400">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Create Your Store
          </h1>

          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="StoreName" className="block text-blue-900 font-semibold mb-1">
                Store Name
              </label>
              <input
                id="StoreName"
                type="text"
                value={StoreName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your store name"
              />
            </div>

            <div>
              <label htmlFor="StoreDescription" className="block text-blue-900 font-semibold mb-1">
                Description
              </label>
              <textarea
                id="StoreDescription"
                value={StoreDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Tell customers about your store"
              ></textarea>
            </div>

            <div>
              <label htmlFor="StoreImage" className="block text-blue-900 font-semibold mb-1">
                Store Image <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <input
                id="StoreImage"
                type="file"
                accept="image/*"
                onChange={(e)=>onImageChange(e)}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-xl px-4 py-2 shadow-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-yellow-400 file:text-blue-900 hover:file:bg-yellow-300"
              />
              {storeImagePreview && (
                <div className="mt-4">
                  <img
                    src={storeImagePreview}
                    alt="Store Preview"
                    className="w-full h-48 object-cover rounded-xl border"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-blue-900 font-semibold py-3 rounded-xl hover:bg-yellow-300 transition duration-300 shadow"
            >
              🚀 Create Store
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CreateStorePage;