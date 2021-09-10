import { Accordion, Box, Flex, Heading } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo } from 'react';
import { WorkoutExercise, WorkoutExerciseType } from './WorkoutExercise';

export interface WorkoutMuscleType {
  display_name: string;
  name: string;
  image?: string;
  excercises_muscles: {
    exercise: {
      workouts_exercises: WorkoutExerciseType[];
    };
  }[];
}

interface Props extends WorkoutMuscleType {}

export const WorkoutMuscle: React.FC<Props> = ({ name, excercises_muscles }) => {
  const { t } = useTranslation('common');

  const exercises = useMemo(
    () =>
      excercises_muscles?.map((excercises_muscle) =>
        excercises_muscle.exercise?.workouts_exercises?.map((exercise, index) => (
          <WorkoutExercise key={`${exercise.id}-${index}`} {...exercise} />
        )),
      ),
    [excercises_muscles],
  );

  if (!exercises || !exercises.length) {
    return null;
  }

  return (
    <Box my={5}>
      <Heading size="md" textTransform="capitalize">
        {t(name)}
      </Heading>
      <Accordion allowMultiple={false} allowToggle={true}>
        <Flex flexDirection="column" my={5} gridGap={5}>
          {exercises}
        </Flex>
      </Accordion>
    </Box>
  );
};
