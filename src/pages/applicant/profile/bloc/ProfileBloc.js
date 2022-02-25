import { useNavigate } from "react-router";

const ProfileBloc = (profileService) => {
  let { uploadDataApplicant, updateDataApplicant, getDataApplicantbyId } =
    profileService();

  const handleSubmit = async (values, context) => {
    console.log("ini context", context);
    console.log("handleApplicant", values);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("data", values);
      for (var pair of formData.entries()) {
        console.log("cobaa",pair[0]+ ', ' + pair[1]); 
       }
      const response = await uploadDataApplicant(formData, config);
      return response;
    } catch (err) {
      throw err;
    }
  };

  return { handleSubmit };
};

export default ProfileBloc;
