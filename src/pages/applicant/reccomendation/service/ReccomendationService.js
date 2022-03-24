import { client } from "../../../../http-client/Client"

const ReccomendationService = () =>{

    const getJobReccomendationId = async(header) =>{
        const response = await client.get("/user/jobrec",header)
        return response 
      }
      const postGetDataByListId = async(params,header)=>{
        const response = await client.post("/program/list",params,header)
        return response
    }
    return {getJobReccomendationId,postGetDataByListId}
}
export default ReccomendationService