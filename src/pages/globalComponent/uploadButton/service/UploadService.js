import { client } from "../../../../http-client/Client"

const UploadService = () =>{
    const postUpload = async(params,header)=>{
        const response = await client.post("/resume/upload",params,header)
        return response
    }
    const postGetDataByListId = async(params,header)=>{
        const response = await client.post("/program/list",params,header)
        return response
    }
    return {postUpload,postGetDataByListId}
}
export default UploadService