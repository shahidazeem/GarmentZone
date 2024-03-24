import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import videoBg from "../../assets/videos/loginBg.mp4";
import "./login.css";
import AuthAPI from "../../service/auth";
import localStorageManager from "../../utils/localStorageManager";
import {useDispatch} from 'react-redux';
import {userSignIn} from '../../redux/Slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    let name = e.target.name,
      value = e.target.value;
    setDetails({ ...details, [name]: value });
  };
  const handleLogin = async () => {
    if(details.email!== "" && details.password !== ""){
      await AuthAPI.login(details)
      .then(res=>{
        if(res.data?.statusCode === 200){
          localStorageManager.setUser(res.data.data);
          dispatch(userSignIn(res.data.data));
          navigate("/dashboard");
          return;
        }
        alert(res.data?.msg || "Error");
      })
      .catch(err=>{
        console.log(err);
        alert(err.msg || "Wrong User Id or Password.");
      })
    }else{
      if(details.email === ""){
        alert("Please Enter User Name...");
      }
      else{
        alert("Please Enter Password...");
      }
    }
  
  };
  return (
    <>
      <div className="main">
        <video autoPlay loop muted src={videoBg} className="video" />
        <div className="content">
          <Form layout="vertical" className="login-form">
            <Typography.Title style={{ color: "#873e23", alignSelf: "center" }}>
              Welcome Back !
            </Typography.Title>
            <Form.Item
              label="User Name"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input type="text" name="email" onChange={handleInputs} />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password name="password" onChange={handleInputs} />
            </Form.Item>
            <div className="form-end">
              {/* <Button style={{color:"black", fontWeight:"bold"}} type="link">Dont Have an Account? Register</Button> */}
              <Button className="bottom-link" type="link">
                Forgot Password
              </Button>
            </div>
            <div style={{ width: "100%", margin: "auto" }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <div style={{ marginTop: "15px" }}>
              <Link to="/signup" className="bottom-link" type="link">
                Don't have an acount! Signup
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
