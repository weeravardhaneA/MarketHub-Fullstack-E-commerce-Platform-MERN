import { useEffect, useState } from "react";
import {Navigate} from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useAppContext } from "../Hooks/useAppContext";
import Form from "../Components/Form/Form";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;
import RetrievePrivatedetailsAPI from "../APIs/AdminAPIs/RetrievePrivatedetailsAPI";
import UpdatePrivatedetailsAPI from "../APIs/AdminAPIs/UpdatePrivatedetails";

const AdminPage = () => {

  // Variables ===================================================================

  const {RoleCheck} = useAppContext();
  const [Role, setRole] = useState("");

  const [FormDataArray, setFormDataArray] = useState(
    [
      {_id: "1", name: "Company Name", value: "Company", type: "text"},
      {_id: "2", name: "Company Email", value: "hello@gmail.com", type: "email"}
    ]
  )

  useEffect(() => {

    (async() => {

      const result = await RoleCheck();
      setRole(result);

    })()
  
  }, [])

  // ===================================================================
  // ===================================================================
  // ===================================================================
  
  // useEffect ===================================================================
  
  useEffect(() => {
    
    (async () => {
      
      const privateData = await RetrievePrivatedetailsAPI();
      setFormDataArray(privateData);
      
    })()

  }, [])

  // ===================================================================
  // ===================================================================
  // ===================================================================


  // onChange ==========================================================

  const onFormInputFieldChange = (_id, value) => {

    const newArray = FormDataArray.map((item) => {

      if(item._id === _id)
      {
        return {...item, value}
      }
      else
      {
        return item
      }
    })

    setFormDataArray(newArray)
  }

  // ==========================================================
  // ==========================================================
  // ==========================================================


  // onSubmit ==========================================================

  const onFormSubmit = async (e) => {

    e.preventDefault();
    await UpdatePrivatedetailsAPI(FormDataArray);

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
          
          <Form
            FormName={"AdminPage"}
            FormDataArray={FormDataArray}
            ButtonText={"Save"}
            onChange={onFormInputFieldChange}
            onSubmit={onFormSubmit}
          />
            
        </div>

        <Footer/>

      </>
    );
  }
};

export default AdminPage;
