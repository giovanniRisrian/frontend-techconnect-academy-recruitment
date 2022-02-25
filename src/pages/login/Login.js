import Login from "../globalComponent/login/Login";
import { Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MyComponent from "../homepage/BackgroundImage";
const Logins = () => {
  return (
    <MyComponent
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ backgroundColor: 'transparent',height: "30vh", padding: "4vh" ,
    border: "1px solid",
    padding: "10px",
    boxShadow: "5px 10px black"}} variant="outlined">
        <Login />
      </Card>{" "}
    </MyComponent>
  );
};
export default Logins;
