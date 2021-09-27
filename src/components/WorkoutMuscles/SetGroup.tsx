import React, { useCallback, useMemo } from 'react';
import { Box, chakra, Flex, Tooltip, Text } from '@chakra-ui/react';
import { Link } from 'phosphor-react';
import useTranslation from 'next-translate/useTranslation';
import { WorkoutExercise, WorkoutExerciseType } from './WorkoutExercise';

interface Props {
  workoutExercises: WorkoutExerciseType[];
}

const LinkIcon = chakra(Link);

export const SetGroup: React.FC<Props> = ({ workoutExercises }) => {
  const { t } = useTranslation('common');

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

  const title = useMemo(() => {
    if (!isProperSetGroup) {
      return null;
    }

    if (workoutExercises.length === 2) {
      return t('Super Set');
    }

    return t('Round');
  }, [t, isProperSetGroup, workoutExercises]);

  return (
    <Flex flexDirection="column" gridGap={5}>
      <Text>{title}</Text>
      {workoutExercises.map((exercise, index) => (
        <React.Fragment key={`${exercise.id}-${index}`}>
          <WorkoutExercise {...exercise} />
          {renderLinkIcon(index, exercise.set_group)}
        </React.Fragment>
      ))}
    </Flex>
  );
};
