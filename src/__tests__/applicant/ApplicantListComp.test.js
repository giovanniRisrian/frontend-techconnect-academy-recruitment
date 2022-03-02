import { cleanup } from "@testing-library/react";


describe("Applicant List Screen", () => {
  afterEach(cleanup);
it("Should get all data successfully when no data list", () => {
    const bloc = jest.fn()
    const getPrograms = jest.fn()
    const getApplicantByProgram = jest.fn()
    bloc.mockReturnValue({
        programList: [],
        applicantList: [],
        
    })
})    
})