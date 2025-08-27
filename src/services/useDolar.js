import axios from "axios";

export const useDolar = () => {
  const getDolar = async (setdolar) => {

    axios.get('https://ve.dolarapi.com/v1/dolares/oficial')
      .then(response => {
        setdolar(response.data.promedio)
       
      })
      .catch(error => console.log(error));
  };

  return {
    getDolar
  }
}
