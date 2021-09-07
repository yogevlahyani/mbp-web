import React, { useCallback, useMemo } from 'react';
import { Button, Progress, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { ProgramWeekType } from './ProgramWeeks';
import {
  currentWeekTimeSelector,
  isOngoingWeekSelector,
  isUnlockedSelector,
} from './state';
import { selectedProgramAtom } from '../UserPrograms/state';

interface Props extends ProgramWeekType {}

export const ProgramWeek: React.FC<Props> = ({ id, week_number }) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();
  const selectedProgram = useRecoilValue(selectedProgramAtom);
  const currentWeekTime = useRecoilValue(currentWeekTimeSelector(week_number));
  const isOpen = useRecoilValue(isUnlockedSelector(week_number));
  const isActive = useRecoilValue(isOngoingWeekSelector(week_number));

  const onWeekClick = useCallback(
    () => push(`programs/${selectedProgram?.program?.id}/weeks/${id}`),
    [push, selectedProgram?.program?.id, id],
  );

  const progress = useMemo(() => {
    if (!isOpen) {
      return 0;
    }

    if (!isActive) {
      return 7;
    }

    return currentWeekTime.isoWeekday();
  }, [currentWeekTime, isOpen, isActive]);

  return (
    <Button disabled={!isOpen} width="100%" height={70} p={0} overflow="hidden">
      <Progress
        value={progress}
        height="100%"
        width="100%"
        position="relative"
        hasStripe={isActive}
        isAnimated={isActive}
        colorScheme={isActive ? 'blue' : 'green'}
        max={7}
        min={0}
      >
        <Text
          position="absolute"
          top="50%"
          left={0}
          transform="translateY(-50%)"
          color="white"
          onClick={onWeekClick}
          isTruncated
          width="100%"
          height="auto"
          px={5}
          textAlign="start"
        >
          {t('Week Number', { weekNumber: week_number })}
        </Text>
      </Progress>
    </Button>
  );
};
