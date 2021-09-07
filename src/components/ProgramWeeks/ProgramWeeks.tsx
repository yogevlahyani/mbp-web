import React, { useEffect, useMemo } from 'react';
import { Box, BoxProps, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { selectedProgramAtom } from '../UserPrograms/state';
import useTranslation from 'next-translate/useTranslation';
import { ProgramWeek } from './ProgramWeek';

export interface ProgramWeekType {
  id: string;
  program_week_videos: any[];
  program_week_workouts: any[];
  week_number: number;
}

interface Props extends BoxProps {}

export const ProgramWeeks: React.FC<Props> = (props) => {
  const { t } = useTranslation('common');
  const selectedProgram = useRecoilValue(selectedProgramAtom);
  useEffect(() => {
    console.log('selectedProgram', selectedProgram);
  }, [selectedProgram]);

  const programWeeks = useMemo(
    () =>
      selectedProgram?.program?.program_weeks.map((programWeek) => (
        <ProgramWeek key={programWeek.id} {...programWeek} />
      )),
    [selectedProgram],
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
        <Box backgroundColor="#1A74E2" borderRadius="20px" py={1} px={3}>
          <Text fontSize="20px">
            {t('Workouts Completed', {
              completed: 1,
              total: 1,
            })}
          </Text>
        </Box>
      </Flex>
      <Flex flexDirection="column" gridGap={[3, 10]} width="full" my={5}>
        {programWeeks}
      </Flex>
    </Box>
  );
};
