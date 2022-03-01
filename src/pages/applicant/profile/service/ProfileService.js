import {client} from "../../../../http-client/Client";

const ProfileService = () =>{
    const uploadDataApplicant = async(params,header) => {
      const response = await client.post("/applicant/insert",params,header)
      return response
    }
    return { uploadDataApplicant};
}
export default ProfileService;