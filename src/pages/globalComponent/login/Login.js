import LoginBloc from "./bloc/LoginBloc"
import LoginComponent from "./component/LoginComponent"
import LoginService from "./service/LoginService"

const Login = ()=>{
    return(<div><LoginComponent bloc={() => LoginBloc(LoginService)}/></div>)
}
export default Login