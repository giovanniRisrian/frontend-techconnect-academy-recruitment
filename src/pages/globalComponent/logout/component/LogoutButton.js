import { useContext } from "react";
import { RootContext } from "../../../../App";
import { Button } from "@mui/material";

const LogoutButtonComponent = ({ bloc }) => {
  const { doLogout } = bloc();

  const data = useContext(RootContext);
  const handleLogout = () => {
    doLogout(data);
  };
  return (
    <Button
      color="primary"
      variant="contained"
      sx={{
        fontFamily: "Montserrat",
        fontSize: "12px",
        color: "#FFF",
        backgroudColor: "#8645FF",
        borderRadius: "20px",
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
export default LogoutButtonComponent;
