import React, { useMemo } from 'react';
import { Box, HStack, Portal, Spacer, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import moment from 'moment';
import { Controls } from './Controls';
import { timerAtom, timerCountAtom } from './state';

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
    <Box
      position="fixed"
      bottom={0}
      left={0}
      bgGradient="linear(to-t, blackAlpha.900 0%, blackAlpha.700 25%, blackAlpha.500 50%, blackAlpha.300 75%, transparent 100%)"
      width="100%"
      py={4}
      zIndex={999}
    >
      <Controls>
        <Text fontSize="31px">{formattedTimer}</Text>
      </Controls>
    </Box>
  );
};
