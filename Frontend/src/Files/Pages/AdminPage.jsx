import { useEffect, useState } from "react";
import {Navigate} from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useAuth } from "../AuthProvider/AuthProvider";
import Form from "../Components/Form/Form";

const AdminPage = () => {

  // Variables ===================================================================

  const {RoleCheck} = useAuth();
  const [Role, setRole] = useState("");

  const [FormName, setFormName] = useState("Admin Page")
  const [ButtonText, setButtonText] = useState("Save")
  const [FormDataArray, setFormDataArray] = useState(
    [
      {Id: 1, Text: "Company Name", Value: "Company", Type: "text"},
      {Id: 2, Text: "Company Email", Value: "hello@gmail.com", Type: "email"}
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

  // onChange ==========================================================

  const onFormInputFieldChange = (Id, Value) => {

    const newArray = FormDataArray.map((item) => {

      if(item.Id === Id)
      {
        return {...item, Value}
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
          
          <Form FormName={"AdminPage"} FormDataArray={FormDataArray} ButtonText={"Save"} onChange={onFormInputFieldChange}/>
            
        </div>

        <Footer/>

      </>
    );
  }
};

export default AdminPage;
