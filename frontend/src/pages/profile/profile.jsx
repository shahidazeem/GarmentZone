import React, { useState } from "react";
import { Avatar, Badge, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import UserAPI from "../../service/user";
import { userSignIn } from "../../redux/Slices/userSlice";

const Profile = () => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState();
  const [details, setDetails] = useState({
    file: null,
    username: "",
    firstName: "",
  })

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };


  const handleInputs = (e)=>{
    let name = e.target.name, value = e.target.value;
    setDetails({...details, [name]: value});
  }

  const handleChange = (e) => {
    let file = e.target.files[0];
    console.log(file);
    let isValid = beforeUpload(file);
    if (isValid) {
      getBase64(file, (url) => {
        handleInputs({target: {value: file, name: "file"}});
        setImageUrl(url);
      });
    }
  };

  const handleImagePick = ()=>{
    document.getElementById("img-pick").click()
  }

  const handleSubmit = async ()=>{
    let formData = new FormData();
    Object.keys(details).map(el=>{
        if(el === "something"){

        } else {
            formData.append(el, details[el]);
        }
    })
    
    formData.append("fullName", "Muhammad Hammad Mansha");
    console.log(formData);
    await UserAPI.updateProfile(formData)
    .then(res=>{
        console.log(res.data);
        if(res.data && res.data.statusCode === 200){
          dispatch(userSignIn(res.data.data))
        }
    })
    .catch(err=>{

    })

  }

  return (
    <div>
      <input type="file" id="img-pick" hidden onChange={handleChange} />
      <div style={{ width: "fit-content", position: "relative" }}>
        <Avatar src={imageUrl} size={200} />
        <span
          onClick={handleImagePick}
          style={{
            position: "absolute",
            bottom: 26,
            right: -10,
            backgroundColor: "grey",
            padding: 10,
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <EditOutlined style={{ fontSize: 25, color:"white" }} />
        </span>
      </div>

      <button onClick={handleSubmit}> 
          submit
      </button>
    </div>
  );
};

export default Profile;
