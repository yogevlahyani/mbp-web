import React from 'react';
import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends FlexProps {}

export const BodyWeight: React.FC<Props> = ({ ...flexProps }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('Weight')}</Text>
      <Box width={['auto', '100%']}>
        <Text textAlign="center">{t('Body Weight')}</Text>
      </Box>
    </Flex>
  );
};
