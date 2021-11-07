import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import config from '../config';

const {
  providers: { hasura },
} = config;

const httpLink = createHttpLink({
  uri: hasura.graphqlUrl,
});

interface GetApolloClientOptions {
  token?: string;
}

export const getApolloClient = ({ token }: GetApolloClientOptions) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'x-hasura-role': token ? 'user' : 'public',
        authorization: token && `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
};
