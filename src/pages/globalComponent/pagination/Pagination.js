import { Pagination, Stack } from "@mui/material"

const BasicPagination = (props) =>{
    // const handleCount = () =>{
    //    if(props.data.length % 4 === 0){
    //      return parseInt(props.data.length / 4)
    //    }else{
    //      return parseInt(props.data.length / 4)+1
    //    }
    // }
    console.log("data",props);
    return(
        <Stack spacing={2}>
        <Pagination 
        count={props.data.LastPage} 
        color="secondary"
        onChange={props.onChange}
        />
      </Stack>
    )
}
export default BasicPagination;