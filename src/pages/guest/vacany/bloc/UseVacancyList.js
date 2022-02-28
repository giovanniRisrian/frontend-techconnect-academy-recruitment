import { useState } from "react"

const UseVacancyList = () => {
    const [list, setList] = useState([])
    return {list, setList}
}
export default UseVacancyList;