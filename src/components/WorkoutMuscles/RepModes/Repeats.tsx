import React, { useMemo } from 'react';
import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Props extends FlexProps {
  count: number;
  isMaxRepeats?: boolean;
}

export const Repeats: React.FC<Props> = ({
  count,
  isMaxRepeats = false,
  ...flexProps
}) => {
  const { t } = useTranslation('common');

  const repeats = useMemo(() => {
    if (isMaxRepeats) {
      return `${t('Max')} ${t('Repeats')}`;
    }

    return t('RepeatsCount', { count });
  }, [count, isMaxRepeats, t]);

  return (
    <Flex
      {...flexProps}
      flexDirection={['row', 'column']}
      justifyContent="space-between"
    >
      <Text>{t('Repeats')}</Text>
      <Box width={['auto', '100%']}>
        <Text textAlign="center">{repeats}</Text>
      </Box>
    </Flex>
  );
};
