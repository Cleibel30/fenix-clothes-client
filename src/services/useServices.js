import axios from 'axios'

export const useService = () => {
    const getTypesService = async (setresponseApi) => {

        axios.get('http://localhost:3000/api/type/getAll', { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    };

    const getServiceAllByType = async (setresponseApi, type_id) => {
        axios.get(`http://localhost:3000/api/type/getAllServices/${type_id}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }


    const getServiceAll = async (setresponseApi) => {
        axios.get('http://localhost:3000/api/service/getAllServices', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }

    const getServiceById = async (setresponseApi, service_id) => {
        axios.get(`http://localhost:3000/api/service/getService/${service_id}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(response => {
                setresponseApi(response.data)
            })
            .catch(error => setresponseApi(error.response.data));
    }

    return {
        getTypesService,
        getServiceAllByType,
        getServiceAll,
        getServiceById
    }
}
