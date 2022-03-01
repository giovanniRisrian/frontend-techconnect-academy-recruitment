import VacancyComponent from "./component/VacancyList";
import VacancyService from "./service/VacancyService";
import VacancyListBloc from "./bloc/VacancyListBloc";
import UseVacancyList from "./bloc/UseVacancyList";
const Vacancy = ()=>{
    return(
    <div>
        <VacancyComponent bloc={() => VacancyListBloc(VacancyService, UseVacancyList)}/>
    </div>)
}
export default Vacancy;