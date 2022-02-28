import { client } from "../../../../http-client/Client"

const RegisterService = () =>{
    const postRegister = async(params)=>{
        const response = await client.post("/user/register",params)
        return response
    }
    const postRegisterRecruiter = async(params,header)=>{
        const response = await client.post("/administrator/register/recruiter",params,header)
        return response
    }
    return {postRegister,postRegisterRecruiter}
}
export default RegisterService