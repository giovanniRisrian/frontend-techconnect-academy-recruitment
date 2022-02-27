import { client } from "../../../../http-client/Client"

const StatusService = () =>{
    async function getAppliedProgram(params){ 
        const response =  await client.get('/programs', params)
        return response;
    }
    async function getDetailAppliedProgram(id){
        const response =  await client.get(`/program/${id}`)
        return response;
    }
    return {
        getAppliedProgram,
        getDetailAppliedProgram
    }
}
export default StatusService;