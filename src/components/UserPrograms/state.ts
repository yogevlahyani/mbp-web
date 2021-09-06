import { atom } from "recoil";
import { ProgramType } from "./UserProgram";

export const selectedProgramAtom = atom<ProgramType | null>({
  key: "SelectedProgram",
  default: null,
});
