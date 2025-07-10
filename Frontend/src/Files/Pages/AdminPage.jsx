import { useEffect, useState } from "react";
import {Navigate} from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useAuth } from "../Tags/AuthProvider";

const AdminPage = () => {

  // Variables ===================================================================

  const {RoleCheck} = useAuth();

  const [Role, setRole] = useState("");
  
  const [FormDataObj, setFormDataObj] = useState({HeaderText: "Company Details", ButtonText: "Save Changes"});

  const [DataArray, setDataArray] = useState([

    { name: "Company Name", value: "Hello" },
    
  ]);

  useEffect(() => {

    // pahala widihata thamai useEffect ekak athule async function ekak use karanne.
    (async() => {

      const result = await RoleCheck();
      setRole(result);

    })()
  
  }, [])

  // ===================================================================
  // ===================================================================
  // ===================================================================

  // onChange ==========================================================

  const onChange = (name, value) => {

    try
    {
      const newArray = [...DataArray];

      const obj = newArray.find((item) => item.name == name)
      obj.value = value;
      setDataArray(newArray);

      console.log(DataArray);

    }
    catch(err)
    {
      console.log("myErr onChange :=== " + err);
    }
    finally
    {
    }
  }

  // ==========================================================
  // ==========================================================
  // ==========================================================



  if(Role == "")
  {
    return <div>Loading...........</div>
  }
  else if(Role != "admin")
  {
    return <Navigate to="/home"/>
  }
  else if(Role === "admin")
  {
    return (
      <>
        <Header />

        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--c1)] via-[var(--c5)]/60 to-[var(--c1)]">
          <div className="w-8/10 md:w-7/10 lg:w-1/2 flex items-center justify-center">

          {/* <Form FormDataObj={FormDataObj} DataArray={DataArray} onChange={onChange}/> */}
            
          </div>

        </div>

        <Footer/>

      </>
    );
  }
};

export default AdminPage;
