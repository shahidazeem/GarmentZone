import axios from "axios";
import getServerUrl from "../utils/getServerUrl";
import CatchAPI from "./CatchAPI";
let url = getServerUrl();

const login = async (data) => {
  return await CatchAPI(axios.post(`${url}auth/login`, data));
};

const signup = async (data) => {
  return await axios.post(`${url}auth/signup`, data);
};

const verifyJWT = async (data) => {
  return await axios.post(`${url}auth/verify-jwt`, data);
};

const sendEmailToken = async (data) => {
  return await axios.post(`${url}auth/send-email-token`, data);
};

const verifyEmailToken = async (data) => {
  return await axios.post(`${url}auth/verify-email-token`, data);
};


const AuthAPI = {
    login,
    signup,
    verifyEmailToken,
    verifyJWT,
    sendEmailToken,
};

export default AuthAPI;
