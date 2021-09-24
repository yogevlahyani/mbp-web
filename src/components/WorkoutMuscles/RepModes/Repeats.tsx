import React from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends BoxProps {
  count: number;
}

export const Repeats: React.FC<Props> = ({ count, ...boxProps }) => {
  const { t } = useTranslation('common');

  return (
    <Box {...boxProps}>
      <Text>{t('Repeats')}</Text>
      <Badge colorScheme="green" variant="solid" width="100%">
        <Text textAlign="center">{t('Repeats Count', { count })}</Text>
      </Badge>
    </Box>
  );
};
