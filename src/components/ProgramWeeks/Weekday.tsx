import React, { useMemo } from 'react';
import { Button, Text, VStack } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { currentWeekTimeSelector, isOngoingWeekSelector } from './state';

interface Props {
  weekId: string;
  weekday: number;
  week_number: number;
  exercisesCount: number;
}

export const Weekday: React.FC<Props> = ({
  weekday,
  week_number,
  exercisesCount,
}) => {
  const { t } = useTranslation('common');
  const currentWeekTime = useRecoilValue(currentWeekTimeSelector(week_number));
  const isOngoing = useRecoilValue(isOngoingWeekSelector(week_number));

  const isActive = useMemo(
    () =>
      currentWeekTime.isBefore(moment(), 'isoWeeks') ||
      (isOngoing && moment().isoWeekday() >= weekday),
    [weekday, isOngoing, currentWeekTime],
  );

  return (
    <Button
      colorScheme={isActive ? 'green' : 'gray'}
      py="15px"
      px="45px"
      height="auto"
      width={['100%', 'auto']}
    >
      <VStack gridGap={0} py="0">
        <Text fontSize={20}>{t('Day', { number: weekday + 1 })}</Text>
        <Text fontSize={15}>{t('Exercises', { exercisesCount })}</Text>
      </VStack>
    </Button>
  );
};
