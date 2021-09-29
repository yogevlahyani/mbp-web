import { Accordion, Box, Flex, Heading } from '@chakra-ui/react';
import { chain } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo } from 'react';
import { SetGroup } from './SetGroup';
import { WorkoutExerciseType } from './WorkoutExercise';

export interface WorkoutMuscleType {
  name?: string;
  exercises_muscles: WorkoutExerciseType[];
}

interface Props extends WorkoutMuscleType {}

export const WorkoutMuscle: React.FC<Props> = ({ name, exercises_muscles }) => {
  const setGroups: WorkoutExerciseType[][] = useMemo(
    () => chain(exercises_muscles).groupBy('set_group').sortBy('order').value(),
    [exercises_muscles],
  );

  const exercises = useMemo(
    () =>
      setGroups.map((workoutExercises) => (
        <SetGroup
          key={workoutExercises[0].set_group}
          workoutExercises={workoutExercises}
        />
      )),
    [setGroups],
  );

  const muscleName = useMemo(() => {
    if (!name) {
      return null;
    }

    return (
      <Heading size="md" textTransform="capitalize">
        {name}
      </Heading>
    );
  }, [name]);

  if (!exercises || !exercises.length) {
    return null;
  }

  return (
    <Box my={5}>
      {muscleName}
      <Accordion allowMultiple={true} allowToggle={true}>
        <Flex flexDirection="column" my={5} gridGap={5}>
          {exercises}
        </Flex>
      </Accordion>
    </Box>
  );
};
