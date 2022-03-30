import ActivationBloc from "./bloc/ActivationBloc"
import ActivationComponent from "./component/ActivationComponent"
import ActivationService from "./service/ActivationService"

const Activation = ()=>{
    return(<div><ActivationComponent bloc={() => ActivationBloc(ActivationService)}/></div>)
}
export default Activation