import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { RootContext } from "../../App";
import LogoutButton from "../globalComponent/logout/LogoutButton";
import UploadButton from "../globalComponent/uploadButton/UploadButton";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const data = useContext(RootContext);
  let userInfo = jwt_decode(data.userInfo);
  console.log("data",userInfo);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     data.dispatch({ name: null, token: null });
//     navigate("/login");
//   };
  return (
    <div>
    <LogoutButton/><br/>
      ini Dashboard
      untuk {userInfo.Email}
      <UploadButton/>
    </div>
  );
};
export default Dashboard;
