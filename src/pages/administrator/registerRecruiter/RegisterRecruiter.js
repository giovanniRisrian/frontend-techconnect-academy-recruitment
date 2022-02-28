import RegisterBloc from "../../globalComponent/register/bloc/RegisterBloc"
import RegisterService from "../../globalComponent/register/service/RegisterService"
import RegisterRecruiterComponent from "./component/RegisterRecruiterComponent"



const RegisterRecruiter = ()=>{
    return(<div><RegisterRecruiterComponent bloc={() => RegisterBloc(RegisterService)}/></div>)
}
export default RegisterRecruiter