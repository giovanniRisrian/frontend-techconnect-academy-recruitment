import { useContext } from "react";
import { RootContext } from "../../../../App";

const LogoutButtonComponent = ({ bloc }) => {
  const { doLogout } = bloc();

  const data = useContext(RootContext);
  const handleLogout = () => {
    doLogout(data);
  };
  return <button onClick={handleLogout}>Logout</button>;
};
export default LogoutButtonComponent;
