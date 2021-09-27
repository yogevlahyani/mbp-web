import React, { useMemo } from 'react';
import { Badge } from '@chakra-ui/react';
import config from '../../config';

interface Props {}

export const EnvBadge: React.FC<Props> = ({}) => {
  const { environment, isProduction } = config;
  console.log('isProduction', isProduction);
  console.log('environment', environment);
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  console.log('process.env.APP_ENV', process.env.APP_ENV);
  console.log(
    'config.providers.hasura.graphqlUrl',
    config.providers.hasura.graphqlUrl,
  );
  console.log('process.env.HASURA_GRAPHQL_URL', process.env.HASURA_GRAPHQL_URL);

  const colorSchema = useMemo(() => {
    console.log('colorSchema environment', environment);
    console.log('colorSchema environment.toLowerCase()', environment.toLowerCase());

    return environment.toLowerCase() === 'staging' ? 'green' : 'red';
  }, [environment]);

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
