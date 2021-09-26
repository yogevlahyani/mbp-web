import React from 'react';
import { Badge, Flex, FlexProps, Text } from '@chakra-ui/react';
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
      <Badge colorScheme="pink" variant="solid" width={['auto', '100%']}>
        <Text textAlign="center">{t('Body Weight')}</Text>
      </Badge>
    </Flex>
  );
};
