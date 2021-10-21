import React, { useCallback, useMemo } from 'react';
import {
  Accordion,
  Box,
  Center,
  chakra,
  Flex,
  Heading,
  Tooltip,
} from '@chakra-ui/react';
import { ArrowDown } from 'phosphor-react';
import { WorkoutExercise, WorkoutExerciseType } from './WorkoutExercise';

export interface WorkoutMuscleType {
  name?: string;
  exercises_muscles: WorkoutExerciseType[];
  setGroupId?: string;
}

interface Props extends WorkoutMuscleType {}

const ArrowDownIcon = chakra(ArrowDown);

export const WorkoutMuscle: React.FC<Props> = ({
  name,
  exercises_muscles,
  setGroupId,
}) => {
  // More than 2 items linked
  const isProperSetGroup = Boolean(setGroupId && exercises_muscles.length > 1);

  const renderLinkIcon = useCallback(
    (index: number) => {
      if (
        !isProperSetGroup ||
        !setGroupId ||
        index >= exercises_muscles.length - 1
      ) {
        return null;
      }

      return (
        <Center my="-40px" zIndex={999}>
          <Tooltip
            label={`Super Set (${exercises_muscles.length})`}
            placement="top"
            hasArrow
            background="black"
          >
            <Flex
              height="48px"
              background="white"
              borderRadius="lg"
              justifyContent="center"
              flexDir="column"
            >
              <ArrowDownIcon size="32px" color="black" />
            </Flex>
          </Tooltip>
        </Center>
      );
    },
    [isProperSetGroup, exercises_muscles, setGroupId],
  );

  const exercises = useMemo(
    () =>
      exercises_muscles.map(
        (workoutExercise: WorkoutExerciseType, index: number) => (
          <React.Fragment key={`${workoutExercise.id}-${index}`}>
            <WorkoutExercise {...workoutExercise} />
            {/* {renderLinkIcon(index)} */}
          </React.Fragment>
        ),
      ),
    [exercises_muscles],
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
    <Box>
      {muscleName}
      <Accordion allowMultiple={true} allowToggle={true}>
        <Flex flexDirection="column" gridGap={5}>
          {exercises}
        </Flex>
      </Accordion>
    </Box>
  );
};
