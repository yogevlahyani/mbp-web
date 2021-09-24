import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import {
  ArrowsCounterClockwise,
  StopCircle,
  PauseCircle,
  PlayCircle,
} from 'phosphor-react';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import moment, { Moment } from 'moment';
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

export const MotionBox = motion<BoxProps>(Box);

export const timerAtom = atom<{ startedAt: Moment | null; isActive: boolean }>({
  key: 'Timer',
  default: {
    startedAt: null,
    isActive: false,
  },
});

export const timerCountAtom = atom({
  key: 'TimerCount',
  default: 0,
});

export const Controls: React.FC<{}> = ({}) => {
  const [timer, setTimer] = useRecoilState(timerAtom);
  const [timerCount, setTimerCount] = useRecoilState(timerCountAtom);
  const resetTimer = useResetRecoilState(timerAtom);
  const resetTimerCount = useResetRecoilState(timerCountAtom);

  useEffect(() => {
    if (!timer.isActive || !timer.startedAt) {
      return;
    }

    const interval = setInterval(
      () => setTimerCount(moment().diff(timer.startedAt, 'seconds')),
      1000,
    );

    return () => clearInterval(interval);
  }, [timer, setTimerCount, timerCount]);

  const stopTimer = useCallback(() => {
    resetTimer();
    resetTimerCount();
  }, [resetTimer, resetTimerCount]);

  const pauseTimer = useCallback(
    () => setTimer((state) => ({ ...state, isActive: false })),
    [setTimer],
  );

  const startTimer = useCallback(
    () =>
      setTimer({
        startedAt: moment().subtract(timerCount, 'seconds'),
        isActive: true,
      }),
    [setTimer, timerCount],
  );

  const resetTimerWithActive = useCallback(() => {
    stopTimer();
    setTimer({
      startedAt: moment(),
      isActive: true,
    });
  }, [stopTimer, setTimer]);

  const playPause = useMemo(() => {
    if (timer.isActive) {
      return (
        <MotionBox
          key="PauseControl"
          initial={{ transform: `translateY(${Number(timer.isActive) * 100}%)` }}
          animate={{ transform: `translateY(${Number(!timer.isActive) * 100}%)` }}
          exit={{ transform: `translateY(-${Number(timer.isActive) * 100}%)` }}
          position="absolute"
        >
          <IconButton
            aria-label="Pause"
            icon={<PauseCircle size="100%" />}
            size="lg"
            variant="unstyled"
            onClick={pauseTimer}
            _focus={{ border: 'none' }}
          />
        </MotionBox>
      );
    }

    return (
      <MotionBox
        key="PlayControl"
        initial={{ transform: `translateY(${Number(!timer.isActive) * 100}%)` }}
        animate={{ transform: `translateY(${Number(timer.isActive) * 100}%)` }}
        exit={{ transform: `translateY(-${Number(!timer.isActive) * 100}%)` }}
        position="absolute"
      >
        <IconButton
          aria-label="Play"
          icon={<PlayCircle size="100%" />}
          size="lg"
          variant="unstyled"
          onClick={startTimer}
          _focus={{ border: 'none' }}
        />
      </MotionBox>
    );
  }, [pauseTimer, startTimer, timer.isActive]);

  return (
    <>
      <IconButton
        key="ResetControl"
        aria-label="Reset"
        icon={<ArrowsCounterClockwise size="100%" />}
        size="md"
        variant="unstyled"
        onClick={resetTimerWithActive}
        _focus={{ border: 'none' }}
      />
      <IconButton
        key="StopControl"
        aria-label="Pause"
        icon={<StopCircle size="100%" />}
        size="lg"
        variant="unstyled"
        onClick={stopTimer}
        _focus={{ border: 'none' }}
      />
      <MotionBox position="relative" width="48px" height="48px" overflowY="hidden">
        <AnimatePresence>{playPause}</AnimatePresence>
      </MotionBox>
    </>
  );
};
