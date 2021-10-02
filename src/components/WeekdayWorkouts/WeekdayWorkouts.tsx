import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Skeleton,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { GET_WEEKDAY_WORKOUTS } from '../../queries/workouts';
import { WeekdayWorkout, WeekdayWorkoutType } from './WeekdayWorkout';
import { useRouter } from 'next/router';

interface Props {
  weekId: string;
  weekday: number;
}

export const WeekdayWorkouts: React.FC<Props> = ({ weekId, weekday }) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();

  const { data, loading } = useQuery(GET_WEEKDAY_WORKOUTS, {
    variables: { weekId, weekday },
  });

  const weekNumber = useMemo(() => data?.program_weeks_by_pk.week_number, [data]);

  const workouts = useMemo(
    () =>
      data?.program_weeks_by_pk?.program_week_workouts?.map(
        ({ workout }: { workout: WeekdayWorkoutType }, index: number) => (
          <Skeleton key={`${workout.id}-${index}`} isLoaded={!loading}>
            <WeekdayWorkout {...workout} />
          </Skeleton>
        ),
      ),
    [data, loading],
  );

  const doneButton = useMemo(() => {
    if (!workouts?.length) {
      return null;
    }

    return (
      <Center>
        <Button colorScheme="green" onClick={() => push('/')} my={5} mx="auto">
          {t('Done')}
        </Button>
      </Center>
    );
  }, [t, push, workouts]);

  if (!workouts?.length) {
    return null;
  }

  return (
    <Box>
      <Skeleton isLoaded={!!weekNumber}>
        <Flex
          gridGap={[0, 2]}
          flexDirection={['column', 'row']}
          alignItems={['center', 'flex-end']}
        >
          <Heading>{t('Week Number', { weekNumber })}</Heading>
        </Flex>
      </Skeleton>
      <Divider my={5} />
      {workouts}
      {doneButton}
    </Box>
  );
};
