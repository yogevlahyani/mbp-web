import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Button, Container } from '@chakra-ui/react';
import { Play } from 'phosphor-react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import OneSignal from 'react-onesignal';
import { WeekdayWorkouts } from '../../../../src/components/WeekdayWorkouts/WeekdayWorkouts';
import { fittokModeAtom } from '../../../../src/components/Fittok/state';
import { Fittok } from '../../../../src/components/Fittok/Fittok';
import { Timer } from '../../../../src/components/Timer/Timer';
import { withPageAuthRequired } from '../../../../src/hoc/withPageAuthRequired';

export default function Week() {
  const [fittokMode, setFittokMode] = useRecoilState(fittokModeAtom);
  const { query } = useRouter();
  const { weekId, weekday } = query;

  useEffect(() => {
    OneSignal.showSlidedownPrompt();
  }, []);

  const toggleFittokMode = useCallback(() => {
    setFittokMode(!fittokMode);
  }, [fittokMode, setFittokMode]);

  const mode = useMemo(() => {
    if (fittokMode) {
      return <Fittok weekId={String(weekId)} weekday={Number(weekday)} />;
    }

    return <WeekdayWorkouts weekId={String(weekId)} weekday={Number(weekday)} />;
  }, [fittokMode, weekId, weekday]);

  return (
    <Container
      maxWidth={fittokMode ? 'full' : 'container.xl'}
      px={fittokMode ? 0 : '1rem'}
      py={fittokMode ? 0 : 10}
      maxW="full"
      minH="max-content"
      position="relative"
    >
      {mode}
      <Box display={['block', 'none']}>
        <Button
          disabled={true}
          display="none"
          variant="solid"
          position="absolute"
          top={5}
          left={5}
          minWidth="32px"
          width="32px"
          height="32px"
          p={0}
          borderRadius="100%"
          colorScheme={fittokMode ? 'blue' : 'twitter'}
          onClick={toggleFittokMode}
        >
          <Play width="16px" height="16px" />
        </Button>
      </Box>
      <Timer />
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
});
