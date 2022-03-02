import { client } from "../../http-client/Client";
import ApplicantService from "../../pages/applicant/applicant-list/service/ApplicantService";

describe("Applicant list repository", () => {
  it("Should return program list successfully", async () => {
    client.get = jest.fn();
    const data = {
      id: 1,
    };
    client.get.mockResolvedValue({ data: [{ data: { id: 1 } }] });

    const repo = await (await ApplicantService().getPrograms(data)).data;
    const actualResponseId = repo[0].data.id;
    expect(client.get).toHaveBeenCalledWith("/program/", { params: data });
    expect(actualResponseId).toBe(1);
  });
  it("Should return applicant by programs", async () => {
    client.get = jest.fn();
    const id = 1;
    const process = 1;
    client.get.mockResolvedValue({ data: [{ data: { id: 1 } }] });
    const repo = await (
      await ApplicantService().getApplicantsByProgram(id, process)
    ).data;
    const actualResponseId = repo[0].data.id;
    expect(client.get).toHaveBeenCalledWith(
      `/program_applicant/program/process?program_id=${id}&process=${process}`
    );
    expect(actualResponseId).toBe(1);
  });
  it("Should return process successfully", async () => {
    client.get = jest.fn();
    const data = {
      id: 1,
    };
    client.get.mockResolvedValue({ data: [{ data: { id: 1 } }] });

    const repo = await (await ApplicantService().getProcess(data)).data;
    const actualResponseId = repo[0].data.id;
    expect(client.get).toHaveBeenCalledWith("/process/", { params: data });
    expect(actualResponseId).toBe(1);
  });
  it("Should return applicant successfully", async () => {
    client.get = jest.fn();
    const data = 1;
    client.get.mockResolvedValue({ data: [{ data: { id: 1 } }] });

    const repo = await (await ApplicantService().getApplicant(data)).data;
    const actualResponseId = repo[0].data.id;
    expect(client.get).toHaveBeenCalledWith(`applicant/find?id=${data}`);
    expect(actualResponseId).toBe(1);
  });
});
