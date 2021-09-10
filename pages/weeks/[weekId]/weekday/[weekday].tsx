import React, { useCallback, useState } from 'react';
import { Box, Button, Container } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { WeekdayWorkouts } from '../../../../src/components/WeekdayWorkouts/WeekdayWorkouts';
import { fittokModeAtom } from '../../../../src/components/Fittok/state';
import { Fittok } from '../../../../src/components/Fittok/Fittok';

export default function Week() {
  const [fittokMode, setFittokMode] = useRecoilState(fittokModeAtom);
  const { query } = useRouter();
  const { weekId, weekday } = query;

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
    </Container>
  );
}
