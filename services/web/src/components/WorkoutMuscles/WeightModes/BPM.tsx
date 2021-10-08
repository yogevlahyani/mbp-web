import React from 'react';
import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends FlexProps {
  count: number;
}

export const BPM: React.FC<Props> = ({ count = 0, ...flexProps }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('BPM')}</Text>
      <Box width={['auto', '100%']}>
        <Text textAlign="center">{`${count}`}</Text>
      </Box>
    </Flex>
  );
};
