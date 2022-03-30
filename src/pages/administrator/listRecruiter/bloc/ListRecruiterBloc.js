import Swal from "sweetalert2";

const ListRecruiterBloc = (service, useRecruiterList, navigate) => {
  let { getListRecruiter, getRecruiterbyId, deleteRecruiter } = service();
  let { listRecruiter, setList, isLoading, setIsLoading } = useRecruiterList();
  let { navigateTo } = navigate();

  const allRecruiter = async (context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setIsLoading(true);
      const response = await getListRecruiter(config);
      setList(response.data.data);
      setIsLoading(false);
      return response;
    } catch (err) {
      throw err;
    }
  };
  const deleteRecruiterbyId = async (id, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setIsLoading(true);
      await deleteRecruiter(id, config);
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      throw err;
    }
  };

  const handleClickRow = (id) => {
    navigateTo(`/administrator/update/recruiter/${id}`);
  };

  return {
    allRecruiter,
    deleteRecruiterbyId,
    listRecruiter,
    handleClickRow,
    isLoading,
  };
};

export default ListRecruiterBloc;
