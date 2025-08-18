import axios from "axios";
import log from "../../Utils/log";
import { DataObjectType } from "../../Types/ObjectTypes";
const api_url = import.meta.env.VITE_API_URL;

  
const UpdatePrivatedetailsAPI = async (dataArray:DataObjectType[]) => {
    
  const response = await axios.post(api_url + "/admin/update/privatedetails", {dataArray}, {
      
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  })
  const result = response.data;
  log(result);
  
}

export default UpdatePrivatedetailsAPI;