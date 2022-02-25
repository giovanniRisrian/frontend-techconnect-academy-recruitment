import ProfileBloc from "./bloc/ProfileBloc"
import ProfileForm from "./component/ProfileForm"
import ProfileService from "./service/ProfileService"


const Profile = ()=>{
return(
<div>
    <ProfileForm bloc={() => ProfileBloc(ProfileService)}/>
</div>)
}
export default Profile