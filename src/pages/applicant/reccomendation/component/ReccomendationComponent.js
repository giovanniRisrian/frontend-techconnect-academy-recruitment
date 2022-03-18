import { useContext, useEffect } from "react";
const ReccomendationComponent = ({ bloc }) => {
    const { doReccomendation } = bloc();
    useEffect(() => {
        doReccomendation()
      });
    return (<div>Hello </div>)
}
export default ReccomendationComponent