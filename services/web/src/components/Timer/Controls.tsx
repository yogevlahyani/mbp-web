import React, { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { Box, BoxProps, Flex, HStack, IconButton } from '@chakra-ui/react';
import {
  ArrowsCounterClockwise,
  StopCircle,
  PauseCircle,
  PlayCircle,
} from 'phosphor-react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { timerAtom, timerCountAtom } from './state';

export const MotionBox = motion<BoxProps>(Box);

export const Controls: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [timer, setTimer] = useRecoilState(timerAtom);
  const [timerCount, setTimerCount] = useRecoilState(timerCountAtom);
  const resetTimer = useResetRecoilState(timerAtom);
  const resetTimerCount = useResetRecoilState(timerCountAtom);

  useEffect(() => {
    if (!timer.isActive || !timer.startedAt) {
      return;
    }

    const interval = setInterval(
      () => setTimerCount(moment().diff(timer.startedAt, 'milliseconds')),
      0,
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
        startedAt: moment().subtract(timerCount, 'milliseconds'),
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
          left={0}
          top="4px"
        >
          <IconButton
            aria-label="Pause"
            icon={<PauseCircle size="100%" />}
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
        left={0}
        top="4px"
      >
        <IconButton
          aria-label="Play"
          icon={<PlayCircle size="100%" />}
          variant="unstyled"
          onClick={startTimer}
          _focus={{ border: 'none' }}
        />
      </MotionBox>
    );
  }, [pauseTimer, startTimer, timer.isActive]);

  return (
    <Flex justifyContent="center">
      <HStack flex={1}>
        <IconButton
          key="ResetControl"
          aria-label="Reset"
          icon={<ArrowsCounterClockwise size="100%" />}
          variant="unstyled"
          onClick={resetTimerWithActive}
          _focus={{ border: 'none' }}
        />
        <IconButton
          key="StopControl"
          aria-label="Pause"
          icon={<StopCircle size="100%" />}
          variant="unstyled"
          onClick={stopTimer}
          _focus={{ border: 'none' }}
        />
      </HStack>
      <Box flex={3} textAlign="center">
        {children}
      </Box>
      <MotionBox
        position="relative"
        width="auto"
        height="48px"
        overflowY="hidden"
        flex={1}
      >
        <AnimatePresence>{playPause}</AnimatePresence>
      </MotionBox>
    </Flex>
  );
};
