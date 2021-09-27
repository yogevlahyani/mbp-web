import React, { useMemo } from 'react';
import { Badge } from '@chakra-ui/react';
import config from '../../config';

interface Props {}

export const EnvBadge: React.FC<Props> = ({}) => {
  const { environment, isProduction } = config;
  console.log('isProduction', isProduction);
  console.log('environment', environment);
  console.log('process.env.APP_ENV', process.env.VERCEL_ENV);

  const colorSchema = useMemo(() => {
    console.log('colorSchema environment', environment);
    console.log('colorSchema environment.toLowerCase()', environment.toLowerCase());
    console.log('environment.toLowerCase() === staging', environment.toLowerCase() === 'staging');

    return environment.toLowerCase() === 'staging' ? 'green' : 'red';
  }, [environment]);

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
