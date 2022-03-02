import { act, renderHook } from "@testing-library/react-hooks";
import UseProgramForm from "../../pages/program/program-posting/component/UseProgramForm";

describe("ProgramForm usState", () => {
  test("setImage state", () => {
    const image = null;
    const { result } = renderHook(() => UseProgramForm([]));
    act(() => {
      result.current.setImage(image);
    });
    expect(result.current.image).toBe(image);
  });
});
