import React, { useMemo } from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import moment from 'moment';
import { Controls } from './Controls';
import { timerAtom, timerCountAtom } from './state';

export const Timer: React.FC<{}> = ({}) => {
  const timer = useRecoilValue(timerAtom);
  const timerCount = useRecoilValue(timerCountAtom);

  const formattedTimer = useMemo(() => {
    if (!timer.isActive && !timer.startedAt) {
      return <Text fontSize="31px">00:00:00</Text>;
    }

    // So it'll be easy to change to seconds later
    const milliseconds = moment
      .duration(timerCount, 'milliseconds')
      .asMilliseconds();
    const minutesFormat = moment.utc(milliseconds).format('mm');
    const secondsFormat = moment.utc(milliseconds).format('ss');
    const millisecondsFormat = moment.utc(milliseconds).format('SS');

    return (
      <HStack gridGap={0} justifyContent="center">
        <Text fontSize="31px" m="0 !important" width="45px">
          {millisecondsFormat}
        </Text>
        <Text fontSize="31px" m="0 !important">
          :
        </Text>
        <Text fontSize="31px" m="0 !important" width="45px">
          {secondsFormat}
        </Text>
        <Text fontSize="31px" m="0 !important">
          :
        </Text>
        <Text fontSize="31px" m="0 !important" width="45px">
          {minutesFormat}
        </Text>
      </HStack>
    );
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
      <Controls>{formattedTimer}</Controls>
    </Box>
  );
};
