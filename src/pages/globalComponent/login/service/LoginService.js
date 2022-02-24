import { client } from "../../../../http-client/Client"

const LoginService = () =>{
    const postLogin = async(params)=>{
        const response = await client.post("/login",{},{auth:params})
        return response
    }
    const postLogout = async(params)=>{
        const response = await client.post("/logout")
        return response
    }
    return {postLogin,postLogout}
}
export default LoginService