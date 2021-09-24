import React from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends BoxProps {
  seconds: number;
}

export const Tempo: React.FC<Props> = ({ seconds, ...boxProps }) => {
  const { t } = useTranslation('common');

  return (
    <Box {...boxProps}>
      <Text>{t('Tempo')}</Text>
      <Badge colorScheme="telegram" variant="solid" width="100%">
        <Text textAlign="center">{t('Seconds', { count: seconds || 0 })}</Text>
      </Badge>
    </Box>
  );
};
