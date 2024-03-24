import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, message, notification } from "antd";
import videoBg from "../../assets/videos/loginBg.mp4";
import "./signup.css";
import AuthAPI from "../../service/auth";
  import localStorageManager from "../../utils/localStorageManager";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    let name = e.target.name,
      value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const handleSignup = async () => {
    if (!password_validate(details.password)) {
      api.error({
        message: "Password Policy",
        description: (
          <>
            Password must consists of 8 or more characters Password Must
            Contain:
            <ul>
              <li>One or more Capital Letters</li>
              <li>One or more Small Letters</li>
              <li>One or more digit</li>
              <li>One or more Special Symbol</li>
            </ul>
          </>
        ),
        placement: "top",
      });

      return;
    }
    await AuthAPI.signup(details)
      .then((res) => {
        message.success(res.data.msg, 2);
        localStorageManager.setEmail(details.email);
        navigate("/verify-email");
      })
      .catch((err) => {
        message.error(err?.response?.data.msg, 2);
      });
    // navigate("/dashboard");
  };

  const password_validate = (password) => {
    var re = {
      capital: /(?=.*[A-Z])/,
      lower: /(?=.*[a-z])/,
      length: /(?=.{7,40}$)/,
      specialChar: /[ -\/:-@\[-\`{-~]/,
      digit: /(?=.*[0-9])/,
    };
    return (
      re.capital.test(password) &&
      re.lower.test(password) &&
      re.length.test(password) &&
      re.specialChar.test(password) &&
      re.digit.test(password)
    );
  };
  return (
    <>
      {contextHolder}
      <div className="main">
        <video autoPlay loop muted src={videoBg} className="video" />
        <div className="content">
          <Form layout="vertical" className="login-form">
            <Typography.Title style={{ color: "#873e23", alignSelf: "center" }}>
              Welcome !
            </Typography.Title>
            <Form.Item
              label="Email"
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
              <Input
                type="email"
                name="email"
                value={details.email}
                onChange={handleInputs}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password
                name="password"
                value={details.password}
                onChange={handleInputs}
              />
            </Form.Item>
            <div className="form-end">
              {/* <Button style={{color:"black", fontWeight:"bold"}} type="link">Dont Have an Account? Register</Button> */}
              <Link to="/" className="bottom-link" type="link">
                Already have an account! Login
              </Link>
            </div>
            <div style={{ width: "60%", margin: "auto" }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;
