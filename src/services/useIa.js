import axios from "axios";
import { useRouteApi } from "./useRouteApi";

export const useIa = () => {
  const api = import.meta.env.VITE_API;
  
    const getIaResponse = async (setresponseApi, product_id, message) => {
        const body = { message }

        axios.post(`${api}/api/ia/send/${product_id}`, body, { withCredentials: true })
            .then(response => setresponseApi(response.data))
            .catch(error => setresponseApi(error.response.data));
    };
  return {
    getIaResponse
  }
}
