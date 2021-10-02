import React, { useCallback, useMemo } from 'react';
import {
  Box,
  chakra,
  Flex,
  Tooltip,
  Text,
  Divider,
  Center,
  HStack,
} from '@chakra-ui/react';
import { ArrowDown } from 'phosphor-react';
import useTranslation from 'next-translate/useTranslation';
import { chain } from 'lodash';
import { WorkoutMuscle, WorkoutMuscleType } from './WorkoutMuscle';

interface Muscle extends WorkoutMuscleType {
  setGroupId?: string;
}

interface Props {
  muscles: Muscle[];
}

const ArrowDownIcon = chakra(ArrowDown);

export const SetGroup: React.FC<Props> = ({ muscles }) => {
  const { t } = useTranslation('common');

  const setGroupExercises = useMemo(
    () =>
      chain(muscles)
        .map(({ exercises_muscles }) => exercises_muscles)
        .flatten()
        .value(),
    [muscles],
  );

  // More than 2 items linked
  const isProperSetGroup = useMemo(
    () => muscles[0].setGroupId && setGroupExercises.length > 1,
    [muscles, setGroupExercises],
  );

  const renderLinkIcon = useCallback(
    (index: number, setGroupId?: string) => {
      if (!isProperSetGroup || !setGroupId || index >= muscles.length - 1) {
        return null;
      }

      return (
        <Center
          mt="-40px"
          zIndex={999}
          position="absolute"
          left="50%"
          bottom="-30%"
          height="50%"
          transform="translateX(-50%)"
        >
          <Tooltip
            label={`Super Set (${muscles.length})`}
            placement="top"
            hasArrow
            background="black"
          >
            <Flex
              height="70%"
              background="white"
              borderRadius="lg"
              alignItems="center"
            >
              <ArrowDownIcon size="32px" color="black" />
            </Flex>
          </Tooltip>
        </Center>
      );
    },
    [isProperSetGroup, muscles],
  );

  const title = useMemo(() => {
    if (!isProperSetGroup) {
      return null;
    }

    let text = t('Round');

    if (setGroupExercises.length === 2) {
      text = t('Super Set');
    }

    return (
      <HStack>
        <Text>{text}</Text>
        <Text>({t('Exercises', { exercisesCount: setGroupExercises.length })})</Text>
      </HStack>
    );
  }, [t, isProperSetGroup, setGroupExercises]);

  return (
    <Flex flexDirection="column" gridGap={5} mt={5}>
      {title}
      {muscles.map((muscle: WorkoutMuscleType, index: number) => (
        <Box key={`${muscle.name}`} position="relative">
          <WorkoutMuscle {...muscle} />
          {renderLinkIcon(index, muscle.setGroupId)}
        </Box>
      ))}
      <Divider color="white" />
    </Flex>
  );
};
