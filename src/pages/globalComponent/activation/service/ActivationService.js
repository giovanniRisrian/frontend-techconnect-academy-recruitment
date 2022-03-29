import { client } from "../../../../http-client/Client"

const ActivationService = () =>{
    const resendActivation = async(email)=>{
        const response = await client.post(`/user/resend?email=${email}`);
        return response
    }
    
    return {resendActivation}
}
export default ActivationService