import React, { useCallback, useMemo } from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Progress,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';
import { chain, sumBy, union, unionBy } from 'lodash';
import {
  currentWeekTimeSelector,
  isOngoingWeekSelector,
  isUnlockedSelector,
} from './state';
import { selectedProgramAtom } from '../UserPrograms/state';
import { Weekday } from './Weekday';
import { WeekdayWorkoutType } from '../WeekdayWorkouts/WeekdayWorkout';
import { LockIcon } from '@chakra-ui/icons';
import moment from 'moment';

interface WorkoutAggregation {
  workouts_exercises_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export interface ProgramWeekWorkout {
  id: string;
  day_of_the_week: number;
  workout: WeekdayWorkoutType & WorkoutAggregation;
}

export interface ProgramWeekType {
  id: string;
  program_week_videos: any[];
  program_week_workouts: ProgramWeekWorkout[];
  week_number: number;
}

interface Props extends ProgramWeekType {}

export const ProgramWeek: React.FC<Props> = ({
  id,
  week_number,
  program_week_workouts,
}) => {
  const { t } = useTranslation('common');
  const selectedProgram = useRecoilValue(selectedProgramAtom);
  const currentWeekTime = useRecoilValue(currentWeekTimeSelector(week_number));
  const isUnlocked = useRecoilValue(isUnlockedSelector(week_number));
  const isOngoing = useRecoilValue(isOngoingWeekSelector(week_number));

  const weekdays = useMemo(
    () =>
      chain(program_week_workouts)
        .groupBy('day_of_the_week')
        .map((weekdays) => ({
          weekday: weekdays[0].day_of_the_week,
          exercisesCount: sumBy(
            weekdays,
            'workout.workouts_exercises_aggregate.aggregate.count',
          ),
        }))
        .sortBy('weekday')
        .value()
        .map(({ weekday, exercisesCount }) => (
          <Weekday
            key={weekday}
            week_number={week_number}
            weekId={id}
            weekday={weekday}
            exercisesCount={exercisesCount}
          />
        )),
    [program_week_workouts, id, week_number],
  );

  const progress = useMemo(() => {
    if (!isUnlocked) {
      return 0;
    }

    if (!isOngoing) {
      return 7;
    }

    return currentWeekTime.isoWeekday();
  }, [currentWeekTime, isUnlocked, isOngoing]);

  const icon = useMemo(() => {
    if (isUnlocked) {
      return <AccordionIcon width={30} height={30} />;
    }

    return <LockIcon width={5} height={5} />;
  }, [isUnlocked]);

  const willOpenIn = useMemo(() => {
    if (isUnlocked) {
      return null;
    }

    const days = currentWeekTime.diff(moment(), 'days');

    return <Text fontSize={15}>{t('Will open in', { days })}</Text>;
  }, [isUnlocked, currentWeekTime, t]);

  return (
    <AccordionItem isDisabled={!isUnlocked} border="none">
      <AccordionButton
        width="100%"
        height={70}
        borderRadius="10px"
        overflow="hidden"
        p={0}
      >
        <Progress
          value={progress}
          height="100%"
          width="100%"
          position="relative"
          hasStripe={isOngoing}
          isAnimated={isOngoing}
          colorScheme={isOngoing ? 'blue' : 'green'}
          max={7}
          min={0}
        >
          <Text
            position="absolute"
            top="50%"
            left={0}
            transform="translateY(-50%)"
            color="white"
            isTruncated
            width="100%"
            height="auto"
            px={5}
            textAlign="start"
          >
            {t('Week Number', { weekNumber: week_number })}
          </Text>
          <Flex
            flexDirection="row"
            gridGap={5}
            position="absolute"
            left={5}
            top="50%"
            transform="translateY(-50%)"
            alignItems="center"
          >
            {willOpenIn}
            {icon}
          </Flex>
        </Progress>
      </AccordionButton>
      <AccordionPanel px={0} py={5}>
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          gridGap={5}
          justifyContent="space-between"
        >
          {weekdays}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
