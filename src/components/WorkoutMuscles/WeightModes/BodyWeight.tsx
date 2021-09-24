import React from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends BoxProps {}

export const BodyWeight: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation('common');

  return (
    <Box {...boxProps}>
      <Text>{t('Weight')}</Text>
      <Badge colorScheme="pink" variant="solid" width="100%">
        <Text textAlign="center">{t('Body Weight')}</Text>
      </Badge>
    </Box>
  );
};
