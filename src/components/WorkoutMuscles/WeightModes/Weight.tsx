import React from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends BoxProps {
  count: number;
}

export const Weight: React.FC<Props> = ({ count, ...boxProps }) => {
  const { t } = useTranslation('common');

  return (
    <Box {...boxProps}>
      <Text>{t('Weight')}</Text>
      <Badge colorScheme="red" variant="solid" width="100%">
        <Text textAlign="center">{t('Kilograms', { count })}</Text>
      </Badge>
    </Box>
  );
};
