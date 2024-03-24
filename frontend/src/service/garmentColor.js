import axios from "axios";
import getServerUrl from "../utils/getServerUrl";
let url = getServerUrl();

const POST = async (data)=>{
    return await axios.post(`${url}garments/color`, data);
}

const PUT = async (id, data)=>{
    return await axios.put(`${url}garments/color/${id}`, data);
}

const GET = async (id)=>{
    return await axios.get(`${url}garments/color/${id}`);
}

const DELETE = async (id)=>{
    return await axios.delete(`${url}garments/color/${id}`);
}

const GETALL = async ()=>{
    return await axios.get(`${url}garments/color`);
}


const GarmentColorAPI = {
    POST,
    GET,
    GETALL,
    PUT,
    DELETE,
}

export default GarmentColorAPI;