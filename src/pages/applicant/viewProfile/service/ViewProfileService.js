import {client} from "../../../../http-client/Client";

const ViewProfileService = () =>{
    const uploadDataApplicant = async(params,header) => {
      const response = await client.put("/applicant/insert",params,header)
      return response
    }
    const updateDataApplicant = async(params,header) => {
      const response = await client.put("/applicant/update",params,header)
      return response 
    }
    const getDataApplicantbyId = async(params,header) =>{
      const response = await client.get("/user",header)
      return response 
    }
    return { uploadDataApplicant,updateDataApplicant, getDataApplicantbyId };
}
export default ViewProfileService;