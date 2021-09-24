import React from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends BoxProps {
  count: number;
}

export const RPE: React.FC<Props> = ({ count, ...boxProps }) => {
  const { t } = useTranslation('common');

  return (
    <Box {...boxProps}>
      <Text>{t('RPE')}</Text>
      <Badge colorScheme="yellow" variant="solid" width="100%">
        <Text textAlign="center">{`${count}`}</Text>
      </Badge>
    </Box>
  );
};
