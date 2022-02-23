import { useNavigate } from "react-router-dom"
import LogoutButton from "../../globalComponent/logout/LogoutButton"



const AdministratorHome = ()=>{
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate('register/recruiter')
    }
    
    return(<div>Welcome Administrator <LogoutButton/> <button onClick={handleClick}>Register Recruiter</button></div>)
}
export default AdministratorHome