import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Divider, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { GET_WEEKDAY_WORKOUTS } from '../../queries/workouts';
import { WeekdayWorkout, WeekdayWorkoutType } from './WeekdayWorkout';

interface Props {
  weekId: string;
  weekday: number;
}

export const WeekdayWorkouts: React.FC<Props> = ({ weekId, weekday }) => {
  const { t } = useTranslation('common');

  const { data, loading } = useQuery(GET_WEEKDAY_WORKOUTS, {
    variables: { weekId, weekday },
  });

  const weekNumber = useMemo(() => data?.program_weeks_by_pk.week_number, [data]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const workouts = useMemo(
    () =>
      data?.program_weeks_by_pk?.program_week_workouts?.map(
        ({ workout }: { workout: WeekdayWorkoutType }, index: number) => (
          <WeekdayWorkout key={`${workout.id}-${index}`} {...workout} />
        ),
      ),
    [data],
  );

  return (
    <Skeleton isLoaded={!loading}>
      <Flex
        gridGap={[0, 2]}
        flexDirection={['column', 'row']}
        alignItems={['center', 'flex-end']}
      >
        <Heading>{t('Week Number', { weekNumber })}</Heading>
        <Text fontSize="md" py={[0, 1]}>
          זמן משוער לאימון הוא 50:00 דק
        </Text>
      </Flex>
      <Divider my={5} />
      {workouts}
    </Skeleton>
  );
};
