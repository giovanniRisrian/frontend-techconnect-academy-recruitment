import { useParams } from "react-router-dom"
import ActivateAccount from "../../../activation/activation_account"
import LoginBloc from "./bloc/LoginBloc"
import LoginComponent from "./component/LoginComponent"
import LoginService from "./service/LoginService"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () =>{
    const params = useParams()
    const navigate = useNavigate()
    if (params.id && params.email){
        ActivateAccount(params.id, params.email)
        Swal
        .fire({
          title: "Your account successfully activated",
          icon: "success",
          confirmButtonText: "OK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
    }
    console.log("PARAMS",params);
    return(<div><LoginComponent bloc={() => LoginBloc(LoginService)}/></div>)
}
export default Login