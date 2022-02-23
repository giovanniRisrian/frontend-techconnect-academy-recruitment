import LogoutButtonBloc from "./bloc/LogoutButtonComponent"
import LogoutButtonComponent from "./component/LogoutButton"

const LogoutButton = ()=>{
    return(<LogoutButtonComponent bloc={() => LogoutButtonBloc()}/>)
}
export default LogoutButton