import ViewProfileBloc from "./bloc/ViewProfileBloc"
import ProfileBloc from "./bloc/ViewProfileBloc"
import ViewProfileForm from "./component/ViewProfileForm"
import ProfileForm from "./component/ViewProfileForm"
import ViewProfileService from "./service/ViewProfileService"
import ProfileService from "./service/ViewProfileService"


const ViewProfile = ()=>{
return(
<div>
    <ViewProfileForm bloc={() => ViewProfileBloc(ViewProfileService)}/>
</div>)
}
export default ViewProfile