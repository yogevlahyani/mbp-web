import { useQuery } from '@apollo/client';
import { Box, Text, Heading, Skeleton, Flex } from '@chakra-ui/react';
import Trans from 'next-translate/Trans';
import React, { useMemo } from 'react';
import { GET_WORKOUT } from '../../queries/workouts';
import { WorkoutMuscle, WorkoutMuscleType } from '../WorkoutMuscles/WorkoutMuscle';

export interface WeekdayWorkoutType {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface Props extends WeekdayWorkoutType {}

export const WeekdayWorkout: React.FC<Props> = ({ id, name, description }) => {
  const { data, loading } = useQuery(GET_WORKOUT, { variables: { workoutId: id } });

  const exercises = useMemo(
    () =>
      data?.muscles.map((muscle: WorkoutMuscleType) => (
        <WorkoutMuscle key={muscle.name} {...muscle} />
      )),
    [data],
  );

  if (!exercises?.length) {
    return null;
  }

  return (
    <Box>
      <Flex
        gridGap={[0, 2]}
        flexDirection={['column', 'row']}
        alignItems={['center', 'flex-end']}
        justifyContent={['center', 'flex-start']}
      >
        <Heading size="lg">
          <Trans
            i18nKey="common:Workout"
            values={{ workoutName: name }}
            components={[
              <Text key="0" display="inline" background="blue.500" px={2} />,
            ]}
          />
        </Heading>
        <Text fontSize="sm">זמן משוער לאימון הוא 50:00 דק</Text>
      </Flex>
      <Text size="sm">{description}</Text>
      <Flex flexDirection="column">
        <Skeleton isLoaded={!loading}>{exercises}</Skeleton>
      </Flex>
    </Box>
  );
};