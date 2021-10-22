import { Button, Center, CenterProps } from '@chakra-ui/react';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { useInterval } from 'usehooks-ts';
import { workoutStartTimeAtom, workoutTimerMsSelector } from './state';

interface Props extends CenterProps {
  onStart?: () => void;
}

export const StartWorkoutButton: React.FC<Props> = ({ onStart, ...centerProps }) => {
  const { t } = useTranslation('common');
  const setWorkoutStartTime = useSetRecoilState(workoutStartTimeAtom);
  const workoutTimerMs = useRecoilValue(workoutTimerMsSelector);
  const resetWorkoutTimerMs = useResetRecoilState(workoutTimerMsSelector);
  const isOngoingWorkout = Boolean(workoutTimerMs);

  useInterval(
    () => {
      resetWorkoutTimerMs();
    },
    isOngoingWorkout ? 1000 : null,
  );

  const startWorkout = useCallback(async () => {
    await setWorkoutStartTime(moment());
    await resetWorkoutTimerMs();
    onStart && onStart();
  }, [setWorkoutStartTime, resetWorkoutTimerMs, onStart]);

  const timer = useMemo(() => {
    if (!workoutTimerMs) {
      return null;
    }

    return moment.utc(workoutTimerMs).format('HH:mm:ss');
  }, [workoutTimerMs]);

  return (
    <Center {...centerProps}>
      <Button
        colorScheme="blue"
        onClick={startWorkout}
        mx="auto"
        isDisabled={isOngoingWorkout}
      >
        {isOngoingWorkout ? timer : t('Start Workout')}
      </Button>
    </Center>
  );
};
