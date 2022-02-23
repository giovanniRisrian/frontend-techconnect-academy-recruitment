import RegisterBloc from "./bloc/RegisterBloc"
import RegisterComponent from "./component/RegisterComponent"
import RegisterService from "./service/RegisterService"


const Register = ()=>{
    return(<div><RegisterComponent bloc={() => RegisterBloc(RegisterService)}/></div>)
}
export default Register