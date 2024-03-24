import axios from "axios";
import getServerUrl from "../utils/getServerUrl";
let url = getServerUrl();
const SAVETYPE = async (data)=>{
    return await axios.post(`${url}garments/type`, data);
}

const UPDATETYPE = async (id, data) => {
  return await axios.put(`${url}garments/type/${id}`, data);
};

const DELETETYPE = async (id) => {
  return await axios.delete(`${url}garments/type/${id}`);
};

const GETTYPE = async (id) => {
  return await axios.get(`${url}garments/type/${id}`);
};
const GETALLTYPES = async () => {
  return await axios.get(`${url}garments/type`);
};

const GarmentTypeAPI = {
  SAVETYPE,
  UPDATETYPE,
  DELETETYPE,
  GETTYPE,
  GETALLTYPES,
};

export default GarmentTypeAPI;