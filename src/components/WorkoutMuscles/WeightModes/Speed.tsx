import React from 'react';
import { Badge, Box, BoxProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends BoxProps {
  percentage: number;
}

export const Speed: React.FC<Props> = ({ percentage = 0, ...boxProps }) => {
  const { t } = useTranslation('common');

  return (
    <Box {...boxProps}>
      <Text>{t('Speed')}</Text>
      <Badge colorScheme="twitter" variant="solid" width="100%">
        <Text textAlign="center">{`${percentage}%`}</Text>
      </Badge>
    </Box>
  );
};
