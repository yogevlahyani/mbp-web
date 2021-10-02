import { Button, Center } from '@chakra-ui/react';
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

interface Props {}

export const StartWorkoutButton: React.FC<Props> = () => {
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

  const startWorkout = useCallback(() => {
    setWorkoutStartTime(moment());
    resetWorkoutTimerMs();
  }, [setWorkoutStartTime, resetWorkoutTimerMs]);

  const timer = useMemo(() => {
    if (!workoutTimerMs) {
      return null;
    }

    return moment.utc(workoutTimerMs).format('HH:mm:ss');
  }, [workoutTimerMs]);

  return (
    <Center>
      <Button
        colorScheme="green"
        onClick={startWorkout}
        my={5}
        mx="auto"
        isDisabled={isOngoingWorkout}
      >
        {isOngoingWorkout ? timer : t('Start Workout')}
      </Button>
    </Center>
  );
};
