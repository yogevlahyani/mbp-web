import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Portal,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';
import {
  ArrowsCounterClockwise,
  PauseCircle,
  PlayCircle,
  StopCircle,
} from 'phosphor-react';
import { useRouter } from 'next/router';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import useTranslation from 'next-translate/useTranslation';
import { WeekdayWorkouts } from '../../../../src/components/WeekdayWorkouts/WeekdayWorkouts';
import { fittokModeAtom } from '../../../../src/components/Fittok/state';
import { Fittok } from '../../../../src/components/Fittok/Fittok';
import moment, { Moment } from 'moment';
import {
  Controls,
  timerAtom,
  timerCountAtom,
} from '../../../../src/components/Timer/Controls';

export default function Week() {
  const [fittokMode, setFittokMode] = useRecoilState(fittokModeAtom);
  const timer = useRecoilValue(timerAtom);
  const timerCount = useRecoilValue(timerCountAtom);
  const { query } = useRouter();
  const { weekId, weekday } = query;

  const formattedTimer = useMemo(() => {
    if (!timer.isActive && !timer.startedAt) {
      return '00:00:00';
    }

    const milliseconds = moment.duration(timerCount, 'seconds').asMilliseconds();

    return moment.utc(milliseconds).format('HH:mm:ss');
  }, [timerCount, timer]);

  const toggleFittokMode = useCallback(() => {
    setFittokMode(!fittokMode);
  }, [fittokMode, setFittokMode]);

  return (
    <Container
      maxWidth={fittokMode ? 'full' : 'container.xl'}
      px={fittokMode ? 0 : '1rem'}
      py={fittokMode ? 0 : 10}
      maxW="full"
      minH="max-content"
      position="relative"
    >
      {fittokMode ? (
        <Fittok weekId={String(weekId)} weekday={Number(weekday)} />
      ) : (
        <WeekdayWorkouts weekId={String(weekId)} weekday={Number(weekday)} />
      )}
      <Box display={['block', 'none']}>
        <Button
          variant="solid"
          position="absolute"
          top={5}
          left={2}
          minWidth="32px"
          width="32px"
          height="32px"
          p={0}
          borderRadius="100%"
          colorScheme={fittokMode ? 'blue' : 'twitter'}
          onClick={toggleFittokMode}
        >
          <UnlockIcon width="16px" height="16px" />
        </Button>
      </Box>
      <Portal>
        <Box
          position="fixed"
          bottom={0}
          left={0}
          background="blackAlpha.900"
          width="100%"
          p={5}
        >
          <HStack>
            <Text fontSize="21px">{formattedTimer}</Text>
            <Spacer />
            <Controls />
          </HStack>
        </Box>
      </Portal>
    </Container>
  );
}
