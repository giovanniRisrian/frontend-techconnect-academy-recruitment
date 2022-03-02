import { client } from "../../../../http-client/Client"

const StatusService = () =>{
    async function getAppliedProgram(params, header){ 
        const response =  await client.get(`/program_applicant/applicant?id=${params}`,header)
        return response;
    }
    async function getDetailAppliedProgram(idProgram, idApplicant, header){
        const response =  await client.get(`/program_applicant/detailed?program_id=${idProgram}&applicant_id=${idApplicant}`, header)
        return response;
    }
    return {
        getAppliedProgram,
        getDetailAppliedProgram
    }
}
export default StatusService;