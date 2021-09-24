import React from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends BoxProps {
  meters: number;
}

export const Distance: React.FC<Props> = ({ meters, ...boxProps }) => {
  const { t } = useTranslation('common');

  return (
    <Box {...boxProps}>
      <Text>{t('Distance')}</Text>
      <Badge colorScheme="green" variant="solid" width="100%">
        <Text textAlign="center">{t('Meters', { count: meters })}</Text>
      </Badge>
    </Box>
  );
};
