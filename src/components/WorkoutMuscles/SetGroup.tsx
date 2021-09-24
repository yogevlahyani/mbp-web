import React, { useCallback, useMemo } from 'react';
import { Box, chakra, Flex, Tooltip } from '@chakra-ui/react';
import { Link } from 'phosphor-react';
import { WorkoutExercise, WorkoutExerciseType } from './WorkoutExercise';

interface Props {
  workoutExercises: WorkoutExerciseType[];
}

const LinkIcon = chakra(Link);

export const SetGroup: React.FC<Props> = ({ workoutExercises }) => {
  // More than 2 items linked
  const isProperSetGroup = useMemo(
    () => workoutExercises[0].set_group && workoutExercises.length > 1,
    [workoutExercises],
  );

  const renderLinkIcon = useCallback(
    (index: number, setGroupId?: string) => {
      if (!isProperSetGroup || !setGroupId || index >= workoutExercises.length - 1) {
        return null;
      }

      return (
        <Flex my="-40px" zIndex={999}>
          <Tooltip
            label={`Super Set (${workoutExercises.length})`}
            placement="top"
            hasArrow
            background="black"
          >
            <Box
              height="48px"
              background="black"
              borderRadius="lg"
              borderTopEndRadius={0}
              borderBottomEndRadius={0}
              px={5}
            >
              <LinkIcon size="48px" color="white" />
            </Box>
          </Tooltip>
        </Flex>
      );
    },
    [isProperSetGroup, workoutExercises],
  );

  return (
    <Flex flexDirection="column" gridGap={5}>
      {workoutExercises.map((exercise, index) => (
        <React.Fragment key={`${exercise.id}-${index}`}>
          <WorkoutExercise {...exercise} />
          {renderLinkIcon(index, exercise.set_group)}
        </React.Fragment>
      ))}
    </Flex>
  );
};
