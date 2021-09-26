import React from 'react';
import { Badge, Flex, FlexProps, Text } from '@chakra-ui/react';
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
      <Badge colorScheme="telegram" variant="solid" width={['auto', '100%']}>
        <Text textAlign="center">{t('Seconds', { count: seconds || 0 })}</Text>
      </Badge>
    </Flex>
  );
};
