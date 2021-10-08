import { atom } from 'recoil';

export const fittokModeAtom = atom<boolean>({
  key: 'FittokMode',
  default: false,
});
