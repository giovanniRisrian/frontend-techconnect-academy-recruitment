import Swal from "sweetalert2";

const ChangeRecruiterPasswordBloc = (
  service,
  useChangeRecruiterPassword,
  navigation
) => {
  const { postChangePassword } = service();
  const {} = useChangeRecruiterPassword();
  const { navigateTo, paramsNav } = navigation();

  const changePassword = async (formik, context, user) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          "Content-Type": "multipart/form-data",
        },
      };
      // console.log("user", user);
      let mock = { ...formik.values, id: user.id };
      const response = await postChangePassword(mock, config);
      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          if (user.Role === "recruiter") {
            navigateTo("/recruiter");
          } else if (user.Role === "user") {
            navigateTo("/vacancy");
          }
        }
      });
      return response;
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Password is wrong",
      });
      throw err;
    }
  };
  return { changePassword, navigateTo };
};

export default ChangeRecruiterPasswordBloc;
