import React from 'react';
import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends FlexProps {
  seconds: number;
}

export const Tempo: React.FC<Props> = ({ seconds, ...flexProps }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('Tempo')}</Text>
      <Box width={['auto', '100%']}>
        <Text textAlign="center">{t('Seconds', { count: seconds || 0 })}</Text>
      </Box>
    </Flex>
  );
};
