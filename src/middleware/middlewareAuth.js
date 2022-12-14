import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RootContext } from "../App";

import jwt_decode from "jwt-decode";
const MiddlewareAuth = () => {
  const data = useContext(RootContext);
  let Role;

  if (data.userInfo !== null) {
    let userInfo = jwt_decode(data.userInfo);
    Role = userInfo.Role;
    if (Role) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};
export default MiddlewareAuth;
