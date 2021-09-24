import React, { useMemo } from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';

interface Props extends BoxProps {
  seconds: number;
}

export const Time: React.FC<Props> = ({ seconds, ...boxProps }) => {
  const { t } = useTranslation('common');

  const duration = useMemo(() => {
    const milliseconds = moment.duration(seconds, 'seconds').asMilliseconds();

    return moment.utc(milliseconds).format('HH:mm:ss');
  }, [seconds]);

  return (
    <Box {...boxProps}>
      <Text>{t('Time')}</Text>
      <Badge colorScheme="green" variant="solid" width="100%">
        <Text textAlign="center">{duration}</Text>
      </Badge>
    </Box>
  );
};
