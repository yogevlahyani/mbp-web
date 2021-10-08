import { atom } from 'recoil';
import { Moment } from 'moment';

export const timerAtom = atom<{ startedAt: Moment | null; isActive: boolean }>({
  key: 'Timer',
  default: {
    startedAt: null,
    isActive: false,
  },
});

export const timerCountAtom = atom({
  key: 'TimerCount',
  default: 0,
});
