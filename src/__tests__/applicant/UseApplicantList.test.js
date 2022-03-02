import UseApplicantList from "../../pages/applicant/applicant-list/bloc/UseApplicantList";
import { act, renderHook } from "@testing-library/react-hooks";

describe("Applicant list useState", () => {
  test("Set program list", () => {
    const programList = [
      {
        id: 1,
      },
    ];
    const { result } = renderHook(() => UseApplicantList([]));
    act(() => {
      result.current.setProgramList(programList);
    });
    expect(result.current.programList).toBe(programList);
  });
  test("Set applicant list", () => {
    const applicantList = [
      {
        id: 1,
      },
    ];
    const { result } = renderHook(() => UseApplicantList([]));
    act(() => {
      result.current.setApplicantList(applicantList);
    });
    expect(result.current.applicantList).toBe(applicantList);
  });
  test("Set programId", () => {
    const programId = "PR00001";
    const { result } = renderHook(() => UseApplicantList([]));
    act(() => {
      result.current.setProgramId(programId);
    });
    expect(result.current.programId).toBe(programId);
  });
  test("Set program", () => {
    const program = "ITDP";
    const { result } = renderHook(() => UseApplicantList([]));
    act(() => {
      result.current.setProgram(program);
    });
    expect(result.current.program).toBe(program);
  });
  test("Set page", () => {
    const page = 1;
    const { result } = renderHook(() => UseApplicantList([]));
    act(() => {
      result.current.setPage(page);
    });
    expect(result.current.page).toBe(page);
  });
  test("Set step", () => {
    const step = 1;
    const { result } = renderHook(() => UseApplicantList([]));
    act(() => {
      result.current.setStep(step);
    });
    expect(result.current.step).toBe(step);
  });
  test("Set actualStep", () => {
    const actualStep = 1;
    const { result } = renderHook(() => UseApplicantList([]));
    act(() => {
      result.current.setActualStep(actualStep);
    });
    expect(result.current.actualStep).toBe(actualStep);
  });
  test("Set isProgram", () => {
    const isProgram = false;
    const { result } = renderHook(() => UseApplicantList([]));
    act(() => {
      result.current.setIsProgram(isProgram);
    });
    expect(result.current.isProgram).toBe(isProgram);
  });
});
