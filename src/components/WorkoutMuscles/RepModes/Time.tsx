import React, { useMemo } from 'react';
import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';

interface Props extends FlexProps {
  seconds: number;
}

export const Time: React.FC<Props> = ({ seconds, ...flexProps }) => {
  const { t } = useTranslation('common');

  const duration = useMemo(() => {
    const milliseconds = moment.duration(seconds, 'seconds').asMilliseconds();

    return moment.utc(milliseconds).format('HH:mm:ss');
  }, [seconds]);

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('Time')}</Text>
      <Box width={['auto', '100%']}>
        <Text textAlign="center">{duration}</Text>
      </Box>
    </Flex>
  );
};
