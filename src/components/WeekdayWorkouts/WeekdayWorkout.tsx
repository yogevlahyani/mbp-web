import { useQuery } from '@apollo/client';
import { Box, Text, Heading, Skeleton, Flex } from '@chakra-ui/react';
import { chain } from 'lodash';
import Trans from 'next-translate/Trans';
import React, { useMemo } from 'react';
import { GET_WORKOUT } from '../../queries/workouts';
import { SetGroup } from '../WorkoutMuscles/SetGroup';
import { WorkoutMuscleType } from '../WorkoutMuscles/WorkoutMuscle';
import { DoneWorkoutButton } from './DoneWorkoutButton';
import { StartWorkoutButton } from './StartWorkoutButton';

export interface WeekdayWorkoutType {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface Props extends WeekdayWorkoutType {}

export const WeekdayWorkout: React.FC<Props> = ({ id, name, description }) => {
  const { data, loading } = useQuery(GET_WORKOUT, { variables: { workoutId: id } });

  const setGroups = useMemo(
    () =>
      chain(data?.workouts_by_pk?.workouts_exercises)
        .groupBy('set_group')
        .sortBy('order')
        .map((setGroup) =>
          chain(setGroup)
            .groupBy('exercise.exercises_muscles.muscle.name')
            .map((value, key) => ({
              name: key !== 'undefined' ? key : undefined,
              exercises_muscles: value,
              setGroupId: setGroup[0].set_group,
            }))
            .value(),
        )
        .value(),
    [data],
  );

  const exercises = useMemo(
    () =>
      setGroups.map((setGroupMuscles) => (
        <SetGroup
          key={`${setGroupMuscles[0].setGroupId}`}
          muscles={setGroupMuscles}
        />
      )),
    [setGroups],
  );

  if (!exercises?.length) {
    return null;
  }

  return (
    <Box>
      <Flex
        gridGap={[0, 2]}
        flexDirection={['column', 'column', 'row']}
        alignItems={['center', 'center', 'flex-end']}
        justifyContent={['center', 'center', 'flex-start']}
      >
        <Heading size="lg">
          <Trans
            i18nKey="common:Workout Name"
            values={{ workoutName: name }}
            components={[<Text key="0" textAlign="center" />]}
          />
        </Heading>
        <Text fontSize="sm">זמן משוער לאימון הוא 50:00 דק</Text>
      </Flex>
      <StartWorkoutButton mt={10} />
      <Text size="sm">{description}</Text>
      <Flex flexDirection="column">
        <Skeleton isLoaded={!loading}>{exercises}</Skeleton>
      </Flex>
      <DoneWorkoutButton />
    </Box>
  );
};
