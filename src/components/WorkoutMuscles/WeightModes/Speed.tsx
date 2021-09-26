import React from 'react';
import { Badge, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends FlexProps {
  percentage: number;
}

export const Speed: React.FC<Props> = ({ percentage = 0, ...flexProps }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('Speed')}</Text>
      <Badge colorScheme="twitter" variant="solid" width={['auto', '100%']}>
        <Text textAlign="center">{`${percentage}%`}</Text>
      </Badge>
    </Flex>
  );
};
