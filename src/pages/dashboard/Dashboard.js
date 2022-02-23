// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { RootContext } from "../../App";
import LogoutButton from "../globalComponent/logout/LogoutButton";

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
      ini Dashboard
      <LogoutButton/>
    </div>
  );
};
export default Dashboard;
