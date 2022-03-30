import { useState } from "react";

const UseListRecruiter = () => {
  const [listRecruiter, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return { listRecruiter, setList, isLoading, setIsLoading };
};

export default UseListRecruiter;
