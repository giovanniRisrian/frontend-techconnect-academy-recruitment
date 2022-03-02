import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RootContext } from "../App";

import jwt_decode from "jwt-decode";
const MiddlewareAuthRecruiter = () => {
  const data = useContext(RootContext);
  let Role;
  // console.log(data);
  if (data.userInfo !== null) {
    let userInfo = jwt_decode(data.userInfo);
    Role = userInfo.Role;
    if (Role === "recruiter") {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};
export default MiddlewareAuthRecruiter;
