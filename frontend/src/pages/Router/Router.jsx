import React from "react";
import { Route, Routes } from "react-router";
import Pages from "../Exports";

const Router = ({ renderRoutes = false }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pages.Login />} />
        <Route path="/signup" element={<Pages.Signup />} />
        <Route path="/verify-email" element={<Pages.VerifyEmail />} />
        {renderRoutes && (
          <>
            <Route path="/dashboard/*" element={<Pages.Dashboard />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
