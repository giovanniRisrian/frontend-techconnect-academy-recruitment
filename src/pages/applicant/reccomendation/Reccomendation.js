import ReccomendationBloc from "./bloc/ReccomendationBloc"
import ReccomendationComponent from "./component/ReccomendationComponent"
import ReccomendationService from "./service/ReccomendationService"

const Reccomendation = ()=>{
    return(
        // <ReccomendationBloc   service={ ReccomendationService}/>

    <ReccomendationComponent bloc={() => ReccomendationBloc(ReccomendationService)}/>
   )
    }
    export default Reccomendation