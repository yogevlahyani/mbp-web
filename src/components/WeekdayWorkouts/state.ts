import moment from 'moment';
import { Moment } from 'moment';
import { atom, selector } from 'recoil';

export const workoutStartTimeAtom = atom<Moment | null>({
  key: 'WorkoutStartTime',
  default: null,
});

const currentTimeAtom = atom<Moment>({
  key: 'CurrentTimeAtom',
  default: moment(),
});

export const workoutTimerMsSelector = selector<number>({
  key: 'workoutTimerMsSelector',
  get: ({ get }) => {
    if (!workoutStartTimeAtom) {
      return 0;
    }

    const workoutStartTime = get(workoutStartTimeAtom);
    const currentTime = get(currentTimeAtom);
    const diff = currentTime.diff(workoutStartTime);

    return moment.duration(diff).asMilliseconds();
  },
  set: ({ set }) => {
    set(currentTimeAtom, moment());
  },
});
