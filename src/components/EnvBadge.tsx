import React, { useMemo } from 'react';
import { Badge } from '@chakra-ui/react';
import config from '../../config';

interface Props {}

export const EnvBadge: React.FC<Props> = ({}) => {
  const { environment, isProduction } = config;

  const colorSchema = useMemo(
    () => (environment.toLowerCase() === 'preview' ? 'green' : 'red'),
    [environment],
  );

  console.log('colorSchema', colorSchema);

  if (isProduction) {
    return null;
  }

  return (
    <Badge
      position="fixed"
      bottom={3}
      left={3}
      zIndex={9999999999}
      colorScheme={colorSchema}
      p={1}
      textTransform="uppercase"
    >
      {environment}
    </Badge>
  );
};
