import {client} from "../../../../http-client/Client";

const DetailApplicantService = () =>{
    const uploadDataApplicant = async(params,header) => {
      const response = await client.post("/applicant/insert",params,header)
      return response
    }
    const updateDataApplicant = async(params,header) => {
      const response = await client.put("/applicant/update",params,header)
      return response 
    }
    const getDataApplicantbyId = async(params,header) =>{
      const response = await client.get("/applicant/find?id="+params,header)
      return response 
    }
    return { uploadDataApplicant,updateDataApplicant, getDataApplicantbyId };
}
export default DetailApplicantService;