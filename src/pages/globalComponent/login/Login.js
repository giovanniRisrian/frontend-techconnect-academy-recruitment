import { useParams } from "react-router-dom"
import ActivateAccount from "../../../activation/activation_account"
import LoginBloc from "./bloc/LoginBloc"
import LoginComponent from "./component/LoginComponent"
import LoginService from "./service/LoginService"

const Login = () =>{
    const params = useParams()
    if (params.id && params.email){
        ActivateAccount(params.id, params.email)
    }
    console.log("PARAMS",params);
    return(<div><LoginComponent bloc={() => LoginBloc(LoginService)}/></div>)
}
export default Login