import { Pagination, Stack } from "@mui/material"

const BasicPagination = (props) =>{
    // const handleCount = () =>{
    //    if(props.data.length % 4 === 0){
    //      return parseInt(props.data.length / 4)
    //    }else{
    //      return parseInt(props.data.length / 4)+1
    //    }
    // }
    return(
        <Stack spacing={2}>
        <Pagination 
        count={10} 
        color="secondary"
        onChange={props.onChange}
        />
      </Stack>
    )
}
export default BasicPagination;