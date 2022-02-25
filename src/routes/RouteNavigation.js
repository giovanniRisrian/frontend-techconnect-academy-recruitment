import { useNavigate, useParams } from "react-router-dom";

const RouteNavigation = () => {
  const navigate = useNavigate();
  const params = useParams();

  const navigateTo = (url) => {
    navigate(url);
  };

  const paramsNav = () => {
    return params;
  };

  return { navigateTo, paramsNav };
};

export default RouteNavigation;
