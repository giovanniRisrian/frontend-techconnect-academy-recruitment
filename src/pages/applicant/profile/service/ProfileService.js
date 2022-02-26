import {client} from "../../../../http-client/Client";

const ProfileService = () =>{
    const uploadDataApplicant = async(params,header) => {
      const response = await client.post("/profile",params,header)
      return response
    }
    const updateDataApplicant = async(params,header) => {
      const response = await client.post("/profile/form",params,header)
      return response 
    }
    const getDataApplicantbyId = async(params) =>{
      const response = await client.get("/profile/form",params)
      return response 
    }
    return { uploadDataApplicant,updateDataApplicant, getDataApplicantbyId };
}
export default ProfileService;