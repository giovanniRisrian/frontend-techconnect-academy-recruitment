import RouteNavigation from "../../../routes/RouteNavigation"
import DetailApplicantBloc from "./bloc/DetailApplicantBloc"
// import DetailApplicantBloc from "./bloc/DetailApplicantBloc"
import DetailApplicantForm from "./component/DetailApplicantForm"
import UseDetailApplicant from "./component/UseDetailApplicant"
// import DetailApplicantForm from "./component/DetailApplicantForm"
import DetailApplicantService from "./service/DetailApplicantService"
// import DetailApplicantService from "./service/DetailApplicantService"


const DetailApplicant = ()=>{
return(
<div>
    <DetailApplicantForm bloc={() => DetailApplicantBloc(DetailApplicantService, RouteNavigation, UseDetailApplicant)}/>
</div>)
}
export default DetailApplicant