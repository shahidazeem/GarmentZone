import { useEffect, useLayoutEffect, useState } from "react";
import Router from "./pages/Router/Router";
import localStorageManager from "./utils/localStorageManager";
import { useNavigate } from "react-router";
import AuthAPI from "./service/auth";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [renderRoutes, setRenderRoutes] = useState(false);

  useLayoutEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        let data = localStorageManager.getUser();
        if (data && data.token) {
          config.headers["Authorization"] = "Bearer " + data.token;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (user) {
      setRenderRoutes(true);
    }
  }, [user]);

  const verifyUser = async () => {
    let data = localStorageManager.getUser();
    if (data && data.token) {
      await AuthAPI.verifyJWT({ token: data.token })
        .then((res) => {
          if (res.data?.statusCode === 200) {
            navigate("/dashboard");
            setRenderRoutes(true);
          }
        })
        .catch((err) => {
          navigate("/");
        });
      return;
    }

    navigate("/");
  };

  return (
    <>
      <Router renderRoutes={renderRoutes} />
    </>
  );
}

export default App;
