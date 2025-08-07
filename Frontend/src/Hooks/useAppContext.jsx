import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ErrorToast from "../Components/Toasts/ErrorToast";



const AppContext = createContext();

export const AppContextProvider = ({children}) => {

  // Variables ========================================================

  const navigate = useNavigate();

  const [Logged, setLogged] = useState("");

  // ========================================================
  // ========================================================
  // ========================================================


  // API ========================================================

  const LoggedCheck = async () => {

    console.log("========== LoggedCheck Started ==========");

    try
    {
      const response = await axios.get("http://localhost:5000/api/user/auth-provider/logged-check", {

        headers: {"Content-Type": "application/json"},
        withCredentials: true

      })

      const result = response.data;
      console.log(result);

      if(result.code==1)
      {
        ErrorToast("Session Expired. Please Login Again.")
        setLogged(false)
        navigate("/login")
      }
      else if(result.code==2)
      {
        ErrorToast("Unexpected error from VerifyToken Middleware. try connecting support")
        setLogged(false)
        navigate("/login")
      }
      else if(result.code==3)
      {
        setLogged(true)
      }
      else if(result.code==4)
      {
        ErrorToast("Unexpected error")
        setLogged(false)
        navigate("/login")
      }
    }
    catch(err)
    {
      console.log("myErr LoggedCheck :=== " + err);
    }
    finally
    {
      console.log("========== LoggedCheck Ended ==========");
    }

  }

  useEffect(() => {

    LoggedCheck(); // Called when component mounts, and then periodically

    const interval = setInterval(() => {

      LoggedCheck()

    }, 10 * 60 * 1000)

    return (() => clearInterval(interval))

  }, [])


  const RoleCheck = async () => {

    console.log("= = = = = RoleCheck Started = = = = =");

    try
    {
      const response = await axios.get("http://localhost:5000/api/user/auth-provider/role-check", {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
      })

      const result = response.data;
      console.log(result);

      if(result.code==1)
      {
        return result.role;
      }
      else if(result.code==2)
      {
        ErrorToast("RoleCheck Error")
      }
      else if(result.code==3)
      {
        ErrorToast("RoleCheck Unexpected Error")
      }
    }
    catch(err)
    {
      console.log("myErr RoleCheck :=== " + err);
    }
    finally
    {
      console.log("= = = = = RoleCheck Ended = = = = =");
    }
  }

  // ========================================================
  // ========================================================
  // ========================================================




  return(
    
    <AppContext.Provider value={{Logged, setLogged, RoleCheck}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {

  return useContext(AppContext);

}