import { useNavigate } from "react-router";

const ProfileBloc = (profileService) => {
  let { uploadDataApplicant, updateDataApplicant, getDataApplicantbyId } = profileService();

  const handleSubmit = async (values, context) => {
    console.log("ini context",context);
    console.log("handleApplicant",values);
    try{
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}`,
        'Content-Type': 'multipart/form-data' },
      };
      const response = await uploadDataApplicant(values, config);
      return response
    }catch(err) {
      throw err;
    }
  };



  return { handleSubmit};
};

export default ProfileBloc;
