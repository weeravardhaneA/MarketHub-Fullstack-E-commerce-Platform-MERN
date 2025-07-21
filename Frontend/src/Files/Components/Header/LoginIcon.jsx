import { Link } from "react-router-dom";
import {useAuth} from "../../AuthProvider/AuthProvider"

const LoginIcon = () => {

  // Variables ===========================================================================

  const {Logged} = useAuth();

  // ===========================================================================
  // ===========================================================================
  // ===========================================================================


  if(Logged===true)
  {
    return(

      <div
        className="text-[25px] w-30 hover:text-blue-300 transition-colors duration-200 text-sm font-medium flex flex-row justify-end items-center"
      >
        <div>
          <Link to={"/profile"}>
            👤
          </Link>
        </div>

        <div>
          <div href="/cart" className="pl-1 flex justify-around items-center relative text-[20px] hover:text-blue-300 transition-colors duration-200">
            🛒
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full px-1.5 py-0.5">
              3
           </span>
          </div>
        </div>
      </div>

    )
  }
  else if(Logged===false)
  {
    return(

      <div 
        className="text-[25px] w-30 hover:text-blue-300 transition-colors duration-200 text-sm font-medium flex flex-row justify-end items-center">
          <Link to={"/login"}>
            Login
          </Link>
      </div>

    )
  }
  else
  {
    return(
      
      <div
        className="text-[25px] w-30 hover:text-blue-300 transition-colors duration-200 text-sm font-medium flex flex-row justify-end items-center">
          Checking
      </div>
      
    )
  }

}

export default LoginIcon;