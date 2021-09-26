import React from 'react';
import { Badge, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends FlexProps {
  count: number;
}

export const Repeats: React.FC<Props> = ({ count, ...flexProps }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('Repeats')}</Text>
      <Badge colorScheme="green" variant="solid" width={['auto', '100%']}>
        <Text textAlign="center">{t('Repeats Count', { count })}</Text>
      </Badge>
    </Flex>
  );
};
