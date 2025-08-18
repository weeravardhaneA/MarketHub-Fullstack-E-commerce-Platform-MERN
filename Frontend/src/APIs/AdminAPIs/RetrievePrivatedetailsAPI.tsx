import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;
import log from "../../Utils/log";

const RetrievePrivatedetailsAPI = async () => {

  const response = await axios.get(api_url + "/admin/retrieve/privatedetails", {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
  });
  const result = response.data;
  log(result);
  return result.data;
  
}

export default RetrievePrivatedetailsAPI;