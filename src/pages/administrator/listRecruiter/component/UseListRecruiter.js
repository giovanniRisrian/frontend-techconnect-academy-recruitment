import { useState } from "react";

const UseListRecruiter = () => {
  const [listRecruiter, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  return {
    listRecruiter,
    setList,
    isLoading,
    setIsLoading,
    pageSize,
    setPageSize,
  };
};

export default UseListRecruiter;
