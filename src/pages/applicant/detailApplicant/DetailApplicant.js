import RouteNavigation from "../../../routes/RouteNavigation"
import DetailApplicantBloc from "./bloc/DetailApplicantBloc"
// import DetailApplicantBloc from "./bloc/DetailApplicantBloc"
import DetailApplicantForm from "./component/DetailApplicantForm"
// import DetailApplicantForm from "./component/DetailApplicantForm"
import DetailApplicantService from "./service/DetailApplicantService"
// import DetailApplicantService from "./service/DetailApplicantService"


const DetailApplicant = ()=>{
return(
<div>
    <DetailApplicantForm bloc={() => DetailApplicantBloc(DetailApplicantService, RouteNavigation)}/>
</div>)
}
export default DetailApplicant