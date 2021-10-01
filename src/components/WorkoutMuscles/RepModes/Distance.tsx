import React from 'react';
import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends FlexProps {
  meters: number;
}

export const Distance: React.FC<Props> = ({ meters, ...flexProps }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('Distance')}</Text>
      <Box width={['auto', '100%']}>
        <Text textAlign="center">{t('Meters', { count: meters })}</Text>
      </Box>
    </Flex>
  );
};
