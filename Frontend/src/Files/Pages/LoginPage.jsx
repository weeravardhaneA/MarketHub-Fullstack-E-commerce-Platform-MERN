import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Tags/AuthProvider";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import ErrorToast from "../Components/Toasts/ErrorToast";


const LoginPage = () => {

  // Variables ======================================================================

  const {setLogged} = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });

  // ======================================================================
  // ======================================================================
  // ======================================================================


  // API ======================================================================

  const UserLogin = async () => {

    console.log("UserLogin Started");

    try
    {
      const response = await axios.post("http://localhost:5000/api/user/login", {

        formData

      },{

        headers: {"Content-Type": "application/json"},
        withCredentials: true

      })

      const result = response.data;
      console.log(result);

      if(result.code==1)
      {
        ErrorToast("You Need To Register First")
        setLogged(false)
      }
      else if(result.code==2)
      {
        setLogged(true)
        navigate("/home")
      }
      else if(result.code==3)
      {
        ErrorToast("Wrong Password. Try Again")
      }
      else if(result.code==4)
      {
        ErrorToast("Unexpected Error. Try Again")
        setLogged(false)
      }
    }
    catch(err)
    {
      console.log("myErr UserLogin :=== " + err);
    }
    finally
    {
      console.log("UserLogin Ended");
    }

  }

  // ======================================================================
  // ======================================================================
  // ======================================================================



  // onChange ======================================================================

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ======================================================================
  // ======================================================================
  // ======================================================================



  // onSubmit ======================================================================

  const onSubmit = async (e) => {
    
    e.preventDefault();
    await UserLogin();
  
  };

  // ======================================================================
  // ======================================================================
  // ======================================================================

  return (

    <>
      <Header/>

      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[var(--c1)] via-[var(--c5)]/60 to-[var(--c1)]">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-xl p-10 bg-gradient-to-tr from-[var(--c12)] via-[var(--c5)] to-[var(--c12)] border-[3px] border-[var(--c3)] shadow-2xl rounded-3xl flex flex-col items-center"
        >
          <h2 className="text-4xl font-bold mb-10 text-[var(--c3)]">Login</h2>

          <div className="w-full mb-6">
            <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]"
            />
          </div>

          <div className="w-full mb-6">
            <label className="block text-lg font-medium mb-2 text-[var(--c6)]">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]"
            />
          </div>

          <button
            type="submit"
            className="mt-6 px-6 py-3 font-semibold rounded-xl transition duration-300 bg-[var(--c10)] text-white hover:bg-[var(--c11)]"
          >
            Login
          </button>
        </form>
      </div>

      <Footer/>
    </>
  );
};

export default LoginPage;
