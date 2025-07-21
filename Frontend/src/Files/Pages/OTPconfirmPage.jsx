import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import ErrorToast from "../Components/Toasts/ErrorToast";

const OTPconfirmPage = ({ email }) => {
  
  // Variables ==========================================================================================

  const navigate = useNavigate();

  const {Logged, setLogged} = useAuth();
  
  const [otp, setOtp] = useState("");

  // ==========================================================================================
  // ==========================================================================================
  // ==========================================================================================




  // API ==========================================================================================

  const ConfirmOTP = async () => {

    console.log("ConfirmOTP Started");

    try
    {
      const response = await axios.post("http://localhost:5000/api/user/register/otp-confirm", {

        otp

      },{
         headers: {"Content-Type": "application/json"},
         withCredentials: true
      })

      const result = response.data
      console.log(result);

      if(result.code==1)
      {
        ErrorToast("Please Register Again")
      }
      else if(result.code==2)
      {
        ErrorToast("Wrong OTP")
      }
      else if(result.code==3)
      {
        setLogged(true);
        navigate("/home")
      }
      else if(result.code==4)
      {
        ErrorToast("Please Try Again Later")
      }

    }
    catch(err)
    {
      console.log("myErr :=== " + err);
    }
    finally
    {
      console.log("ConfirmOTP Ended");
    }

  };

  // ==========================================================================================
  // ==========================================================================================
  // ==========================================================================================



  // onChange ==========================================================================================

  const onChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  // ==========================================================================================
  // ==========================================================================================
  // ==========================================================================================



  // onSubmit ==========================================================================================

  const onSubmit = (e) => {

    e.preventDefault();
    ConfirmOTP();

  }

  // ==========================================================================================
  // ==========================================================================================
  // ==========================================================================================

  if(Logged==true)
  {
    return <Navigate to="/home" replace />
  }
  else if(Logged==false)
  {
    return (

      <>
        <Header/>

        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[var(--c1)] via-[var(--c5)]/60 to-[var(--c1)]">
          <form onSubmit={onSubmit} className="max-w-md w-full p-8 bg-white rounded-3xl shadow-2xl flex flex-col items-center space-y-6 border-4 border-[var(--c6)]">
            <h2 className="text-3xl font-bold text-[var(--c3)]">OTP Confirmation</h2>
            <p className="text-center text-[var(--c6)]">Enter the 6-digit OTP sent to <strong>{email}</strong></p>

            <input
              type="text"
              value={otp}
              onChange={onChange}
              placeholder="Enter OTP"
              className="w-full text-center text-xl tracking-widest px-6 py-3 rounded-xl border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c9)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]"
            />

            <button
              type="submit"
              className="w-full px-6 py-3 font-semibold rounded-xl transition duration-300 bg-[var(--c10)] text-white hover:bg-[var(--c11)]"
            >
              Confirm OTP
            </button>
          </form>
        </div>
      
        <Footer/>
      </>
    );
  }
  else
  {
    return <div>Loading...........</div>
  }
};

export default OTPconfirmPage;