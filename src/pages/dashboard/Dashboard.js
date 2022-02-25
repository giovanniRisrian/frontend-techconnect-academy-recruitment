// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { RootContext } from "../../App";
import LogoutButton from "../globalComponent/logout/LogoutButton";
import UploadButton from "../globalComponent/uploadButton/UploadButton";

const Dashboard = () => {
//   const data = useContext(RootContext);
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
      <UploadButton/>
    </div>
  );
};
export default Dashboard;
