import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { DownloadOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Avatar, Popover, ConfigProvider, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "./dashboard.css";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { GiMailShirt } from "react-icons/gi";
import { BiPurchaseTag } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import Home from "../Home/Home";
import GarmentType from "../Garment/GarmentType";
import GarmentColor from "../Garment/GarmentColor";
import GarmentSize from "../Garment/GarmentSize";
import Garment from "../Garment/Garment";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../../redux/Slices/userSlice";
import Profile from "../profile/profile";
import getMediaUrl from "../../utils/getMediaUrl";
// import GarmentType from "../Garment/GarmentType";

const Dashboard = () => {
  const dispatch =  useDispatch();
  const {
    token: { colorPrimary, borderRadiusLG },
  } = theme.useToken();
  const user = useSelector(state=>state.user.user);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const logoutUser=()=>{
    dispatch(userSignOut({}));
    localStorage.clear();
    navigate('/');
  }
  const content = (
    <ul className="nav">
      <li>
        <Link to="/dashboard/profile" className="link-path">
          Profile
        </Link>
      </li>
      <li onClick={logoutUser}>
        <Link to="" className="link-path">
          Logout
        </Link>
      </li>
    </ul>
  );
  return (
    <Layout>
      <Header
      // theme='dark'
      style={{backgroundColor: colorPrimary}}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white"
          }}
        >
          <div style={{fontSize:"30px"}}>Garement Zone</div>
          <div>
          <Popover theme='dark' placement="bottomRight" content={content} overlayStyle={{width: "225px", padding:'0px'}}>
              <Avatar size={40} 
              style={{backgroundColor:'white'}}
                src={getMediaUrl() + "/profiles/" + user?.image + "?" + new Date().toISOString()}>
                {user?.fullName[0]}
              </Avatar>
            </Popover>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          collapsed={collapsed}
          width={250}
          className={"sider"}
          // theme="dark"
        >
          <Menu
          style={{background: colorPrimary}}
          // theme='dark'
            items={[
              {
                label: "Home",
                key: "home",
                icon: <AiOutlineHome size={18} />,
                onClick: () => navigate("/dashboard"),
              },
              {
                label: " Garment Management",
                key: "garment",
                icon: <GiMailShirt size={18} />,
                children: [
                  {
                    label: " Garment Type",
                    key: "garment-type",
                    icon: <GiMailShirt size={18} />,
                    onClick: () => navigate("/dashboard/garment-type"),
                  },
                  {
                    label: " Garment Color",
                    key: "garment-color",
                    icon: <GiMailShirt size={18} />,
                    onClick: () => navigate("/dashboard/garment-color"),
                  },
                  {
                    label: " Garment Size",
                    key: "garment-size",
                    icon: <GiMailShirt size={18} />,
                    onClick: () => navigate("/dashboard/garment-size"),
                  },
                  {
                    label: " Garments",
                    key: "garments",
                    icon: <GiMailShirt size={18} />,
                    onClick: () => navigate("/dashboard/garments"),
                  },
                ],
              },
              {
                label: "Purchase Management",
                key: "purchase",
                icon: <BiPurchaseTag size={18} />,
              },
            ]}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "300px",
            }}
          >
            {collapsed ? (
              <BsArrowRightCircleFill
                size={20}
                onClick={() => setCollapsed(!collapsed)}
                style={{ marginRight: "15px", marginTop: "5px", color: "#fff" }}
                className = "sider-icon"
              />
            ) : (
              <BsFillArrowLeftCircleFill
                size={20}
                onClick={() => setCollapsed(!collapsed)}
                style={{ marginRight: "15px", marginTop: "5px", color: "#fff"}}
              />
            )}
          </div>
        </Sider>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/garment-type" element={<GarmentType />} />
            <Route path="/garment-color" element={<GarmentColor />} />
            <Route path="/garment-size" element={<GarmentSize />} />
            <Route path="/garments" element={<Garment />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
