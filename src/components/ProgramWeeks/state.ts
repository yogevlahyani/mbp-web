import moment from 'moment';
import { selector, selectorFamily } from 'recoil';
import { selectedProgramAtom } from '../UserPrograms/state';

export const weekNumberSelector = selector({
  key: 'WeekNumberTime',
  get: ({ get }) => {
    const selectedProgram = get(selectedProgramAtom);
    const startsAt = moment(selectedProgram?.starts_at);
    const today = moment();

    return today.isoWeek() - startsAt.isoWeek() - 1;
  },
});

export const completedWeeksSelector = selector({
  key: 'CompletedWeeks',
  get: ({ get }) => {
    const selectedProgram = get(selectedProgramAtom);
    const startsAt = moment(selectedProgram?.starts_at);
    const today = moment();
    const totalProgramWeeks = selectedProgram?.program?.program_weeks?.length || 0;

    return Math.min(today.isoWeek() - startsAt.isoWeek(), totalProgramWeeks);
  },
});

export const currentWeekTimeSelector = selectorFamily({
  key: 'CurrentWeekTime',
  get:
    (weekNumber: number) =>
    ({ get }) => {
      const selectedProgram = get(selectedProgramAtom);

      return moment(selectedProgram?.starts_at).add(weekNumber - 1, 'weeks');
    },
});

export const isUnlockedSelector = selectorFamily({
  key: 'IsUnlocked',
  get:
    (weekNumber: number) =>
    ({ get }) => {
      const currentWeekTime = get(currentWeekTimeSelector(weekNumber));

      return currentWeekTime.isSameOrBefore(moment(), 'weeks');
    },
});

export const isOngoingWeekSelector = selectorFamily({
  key: 'IsOngoingWeek',
  get:
    (weekNumber: number) =>
    ({ get }) => {
      const currentWeekTime = get(currentWeekTimeSelector(weekNumber));

      return currentWeekTime.isSame(moment(), 'isoWeek');
    },
});
