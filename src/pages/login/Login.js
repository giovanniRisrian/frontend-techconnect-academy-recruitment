import Login from "../globalComponent/login/Login";
import { Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MyComponent from "../homepage/BackgroundImage";
const Logins = () => {
  return (
    <MyComponent
      style={{
        // height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          backgroundColor: "#FDFCE5",
          padding: "4vh",
          boxShadow: "0 13px 13px -4px lightblue",
        }}
        variant="outlined"
      >
        <Login />
      </Card>{" "}
    </MyComponent>
  );
};
export default Logins;
