import { useState } from "react";

const UseListRecruiter = () => {
  const [listRecruiter, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [modalRegister, setModalRegister] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [id, setId] = useState();

  return {
    listRecruiter,
    setList,
    isLoading,
    setIsLoading,
    pageSize,
    setPageSize,
    modalRegister,
    setModalRegister,
    modalUpdate,
    setModalUpdate,
    id,
    setId,
  };
};

export default UseListRecruiter;
