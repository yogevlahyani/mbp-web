import { useQuery } from '@apollo/client';
import { Skeleton } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { GET_WEEKDAY_WORKOUTS } from '../../queries/workouts';

export interface ProgramWorkout {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface Props {
  weekId: string;
  weekday: number;
}

export const ProgramWorkouts: React.FC<Props> = ({ weekId, weekday }) => {
  const { data, loading } = useQuery(GET_WEEKDAY_WORKOUTS, {
    variables: { weekId, weekday },
  });

  const workouts = useMemo(
    () =>
      data?.program_weeks_by_pk?.program_week_workouts?.map(
        ({ workout }: { workout: ProgramWorkout }, index: number) => (
          <div key={`${workout.id}-${index}`}>{workout.name}</div>
        ),
      ),
    [data],
  );

  return <Skeleton isLoaded={!loading}>{workouts}</Skeleton>;
};
