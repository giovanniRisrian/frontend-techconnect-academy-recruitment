import VacancyComponent from "./component/VacancyList";
import VacancyService from "./service/VacancyService";
import VacancyListBloc from "./bloc/VacancyListBloc";

const Vacancy = ()=>{
    return(
    <div>
        <VacancyComponent bloc={() => VacancyListBloc(VacancyService)}/>
    </div>)
}
export default Vacancy;