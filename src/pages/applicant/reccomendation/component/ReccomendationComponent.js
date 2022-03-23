import { useContext, useEffect } from "react";
const ReccomendationComponent = ({ bloc }) => {
    const { doReccomendation } = bloc();
    useEffect(() => {
        doReccomendation()
      });
    return (<div>No Job Reccomendation </div>)
}
export default ReccomendationComponent