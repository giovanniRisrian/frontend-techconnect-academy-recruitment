import { useNavigate } from "react-router";

const ProfileBloc = (profileService) => {
  let { uploadDataApplicant, updateDataApplicant, getDataApplicantbyId } =
    profileService();

  const handleSubmit = async (values,file, context) => {
    
    console.log("ini context", context);
    console.log("handleApplicant", values);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          'Accept': 'application/json',
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      const jsonText = JSON.stringify(values)
      const jsonPretendFile =  new Blob([jsonText], {
        type: 'application/json'
      });
      formData.append("json", jsonPretendFile);
      formData.append("file", file);
    
      const response = await uploadDataApplicant(formData, config);
      return response;
    } catch (err) {
      throw err;
    }
  };

  return { handleSubmit };
};

export default ProfileBloc;
