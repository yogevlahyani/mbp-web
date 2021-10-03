import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Text, Heading, Flex } from '@chakra-ui/react';
import Trans from 'next-translate/Trans';
import { chain } from 'lodash';
import { GET_WORKOUT } from '../../queries/workouts';
import { WeekdayWorkoutType } from '../WeekdayWorkouts/WeekdayWorkout';
import { WorkoutMuscle, WorkoutMuscleType } from '../WorkoutMuscles/WorkoutMuscle';

interface Props extends WeekdayWorkoutType {}

export const FittokWeekdayWorkout: React.FC<Props> = ({ id, name, description }) => {
  const { data, loading } = useQuery(GET_WORKOUT, { variables: { workoutId: id } });

  const muscles = useMemo(
    () => chain(data?.workouts_by_pk.workouts_exercises || []).value(),
    [data],
  );

  console.log('muscles', muscles);

  const exercises = useMemo(
    () =>
      muscles.map((muscle: WorkoutMuscleType) => (
        <WorkoutMuscle key={muscle.name} {...muscle} />
      )),
    [muscles],
  );

  if (!exercises?.length) {
    return null;
  }

  return (
    <Box flex={1} height="100%">
      <Flex
        gridGap={[0, 2]}
        flexDirection={['column', 'row']}
        alignItems={['center', 'flex-end']}
        justifyContent={['center', 'flex-start']}
        height="100%"
      >
        <Heading size="lg">
          <Trans
            i18nKey="common:Workout Name"
            values={{ workoutName: name }}
            components={[
              <Text key="0" display="inline" background="blue.500" px={2} />,
            ]}
          />
        </Heading>
        <Text fontSize="sm">זמן משוער לאימון הוא 50:00 דק</Text>
      </Flex>
      <Text size="sm">{description}</Text>
    </Box>
  );
};
