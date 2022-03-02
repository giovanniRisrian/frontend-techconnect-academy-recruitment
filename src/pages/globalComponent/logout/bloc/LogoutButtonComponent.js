import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../../../../App";
import ActionType from "../../../../Context/ActionType";

const LogoutButtonBloc = () => {
  const navigate = useNavigate();
  const doLogout = (context) => {
    // console.log("otw lgot")

    // console.log("oaoae",context)
    localStorage.removeItem("token");
    context.dispatch({type:ActionType.LOGIN, name: null, token: null });
    // console.log("ooo",context)
   
    // navigate("/");
    window.location.reload()
    
  };
  return { doLogout };
};
export default LogoutButtonBloc;
