import { client } from "../../../../http-client/Client"

const UploadService = () =>{
    const postUpload = async(params,header)=>{
        const response = await client.post("/resume/upload",params,header)
        return response
    }
    return {postUpload}
}
export default UploadService