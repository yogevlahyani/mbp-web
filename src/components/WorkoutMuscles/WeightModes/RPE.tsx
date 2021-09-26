import React from 'react';
import { Badge, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends FlexProps {
  count: number;
}

export const RPE: React.FC<Props> = ({ count, ...flexProps }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('RPE')}</Text>
      <Badge colorScheme="yellow" variant="solid" width={['auto', '100%']}>
        <Text textAlign="center">{`${count}`}</Text>
      </Badge>
    </Flex>
  );
};
