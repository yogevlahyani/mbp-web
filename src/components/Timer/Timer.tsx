import React, { useMemo } from 'react';
import { Box, HStack, Portal, Spacer, Text } from '@chakra-ui/react';
import moment, { Moment } from 'moment';
import { Controls } from './Controls';
import { atom, useRecoilValue } from 'recoil';

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

export const Timer: React.FC<{}> = ({}) => {
  const timer = useRecoilValue(timerAtom);
  const timerCount = useRecoilValue(timerCountAtom);

  const formattedTimer = useMemo(() => {
    if (!timer.isActive && !timer.startedAt) {
      return '00:00:00';
    }

    const milliseconds = moment.duration(timerCount, 'seconds').asMilliseconds();

    return moment.utc(milliseconds).format('HH:mm:ss');
  }, [timerCount, timer]);

  return (
    <Portal>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        background="blackAlpha.900"
        width="100%"
        p={5}
        zIndex={999}
      >
        <HStack>
          <Text fontSize="21px">{formattedTimer}</Text>
          <Spacer />
          <Controls />
        </HStack>
      </Box>
    </Portal>
  );
};
