import React, { useMemo } from 'react';
import {
  Accordion,
  Box,
  BoxProps,
  Flex,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { selectedProgramAtom } from '../UserPrograms/state';
import useTranslation from 'next-translate/useTranslation';
import { ProgramWeek } from './ProgramWeek';
import { completedWeeksSelector } from './state';

interface Props extends BoxProps {}

export const ProgramWeeks: React.FC<Props> = (props) => {
  const { t } = useTranslation('common');
  const selectedProgram = useRecoilValue(selectedProgramAtom);
  const completedWeeks = useRecoilValue(completedWeeksSelector);

  const programWeeks = useMemo(
    () =>
      selectedProgram?.program?.program_weeks.map((programWeek) => (
        <ProgramWeek key={programWeek.id} {...programWeek} />
      )),
    [selectedProgram],
  );

  const isCompleted = useMemo(
    () => completedWeeks === selectedProgram?.program?.program_weeks?.length,
    [completedWeeks, selectedProgram],
  );

  if (!selectedProgram?.program?.program_weeks?.length) {
    return null;
  }

  return (
    <Box {...props}>
      <Flex alignItems="center" gridGap={[1, 5]} flexDirection={['column', 'row']}>
        <Heading as="h2" fontSize="36px">
          {t('My Workouts')}
        </Heading>
        <Box
          backgroundColor={isCompleted ? 'green.500' : 'blue.500'}
          borderRadius="20px"
          py={1}
          px={3}
        >
          <Text fontSize="20px">
            {t('Workouts Completed', {
              completed: completedWeeks,
              total: selectedProgram?.program?.program_weeks?.length,
            })}
          </Text>
        </Box>
      </Flex>
      <Accordion
        allowToggle={true}
        as={Flex}
        flexDirection="column"
        gridGap={[3, 10]}
        width="full"
        my={5}
      >
        {programWeeks}
      </Accordion>
    </Box>
  );
};
