import { Navigate, useParams, useNavigate } from "react-router-dom";
import { client } from "../http-client/Client";

const ActivateAccount = async (id, email) =>{
    const response = await client.post(`/user/activate?id=${id}&email=${email}`);
    return response;
}

// const ActivationAccount = async ()=> {
//     const params = useParams();
//     console.log("PARAMS", params);
//     Navigate = useNavigate();
//     const response = await ActivateAccount(params.id, params.email);

//     console.log("TEST",response);
    // if(response.status === 200){
    //     alert("Success Activation Account");
    // }else{
    //     alert("Failed Activation Account");
    // }

    // return <Navigate to="/login" />
    // Navigate("/login");
// }

export default ActivateAccount;