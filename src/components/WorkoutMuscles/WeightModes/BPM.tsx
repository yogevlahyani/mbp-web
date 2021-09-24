import React from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends BoxProps {
  count: number;
}

export const BPM: React.FC<Props> = ({ count = 0, ...boxProps }) => {
  const { t } = useTranslation('common');

  return (
    <Box {...boxProps}>
      <Text>{t('BPM')}</Text>
      <Badge colorScheme="teal" variant="solid" width="100%">
        <Text textAlign="center">{`${count}`}</Text>
      </Badge>
    </Box>
  );
};
