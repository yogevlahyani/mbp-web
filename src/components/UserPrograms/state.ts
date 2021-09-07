import { atom } from 'recoil';
import { UserProgramType } from './UserProgram';

export const selectedProgramAtom = atom<UserProgramType | null>({
  key: 'SelectedProgram',
  default: null,
});
