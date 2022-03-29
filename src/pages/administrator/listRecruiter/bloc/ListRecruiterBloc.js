import { useState } from "react";
import { useParams } from "react-router";

const ListRecruiterBloc = (service) => {
  let { getListRecruiter, getRecruiterbyId, deleteRecruiter } = service();
  const [listRecruiter, setList] = useState([])
  let params = useParams();

  const allRecruiter = async (context) =>{
      try{
        const config = {
          headers: { Authorization: `Bearer ${context.userInfo}` },
        };
        const response = await getListRecruiter(config)
        console.log("resss",response);
        setList(response.data.data)
      }catch(err){
          throw err
      }
  }
  const deleteRecruiterbyId = async (data) =>{
      try{
        await deleteRecruiter(data)
      }catch(err){
          throw err
      }
  }
  const recruiterById = async () =>{
    try{
        const response = await getRecruiterbyId(params.id)
        return response
      }catch(err){
          throw err
      }
  }
  return{
    allRecruiter,
    deleteRecruiterbyId,
    listRecruiter,
    recruiterById
  }

};

export default ListRecruiterBloc;
