import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getLocalData } from "../Utils/LocalStorage";

const ReqAuth = ({ children }) => {
  let location = useLocation();
  let isToken = getLocalData("token")

  if (!isToken) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  return children;
};

export default ReqAuth;