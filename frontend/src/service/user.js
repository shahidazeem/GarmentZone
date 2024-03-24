import axios from "axios";
import getServerUrl from "../utils/getServerUrl";
let url = getServerUrl();


const updateProfile = async (data)=>{
    return axios.post(url + "users/profile", data);
}

const UserAPI = {
    updateProfile,
}

export default UserAPI;