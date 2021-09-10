import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  GetServerSidePropsResultWithSession,
  getSession,
} from '@auth0/nextjs-auth0';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ParsedUrlQuery } from 'querystring';
import config from '../../config';

const {
  providers: { hasura },
} = config;

const httpLink = createHttpLink({
  uri: hasura.graphqlUrl,
});

type CallbackType<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = (
  context: GetServerSidePropsContext<Q>,
  client: ApolloClient<NormalizedCacheObject>,
) =>
  | Promise<GetServerSidePropsResult<P>>
  | Promise<GetServerSidePropsResultWithSession>;

export const withApollo =
  (callback: CallbackType) => async (ctx: GetServerSidePropsContext) => {
    const session = getSession(ctx.req, ctx.res);

    if (Math.floor(Date.now() / 1000) > session?.accessTokenExpiresAt!) {
      return {
        redirect: {
          destination: '/auth/logout',
          permanent: false,
        },
      };
    }

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          'x-hasura-role': 'user',
          authorization: session?.accessToken && `Bearer ${session?.accessToken}`,
        },
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    return callback(ctx, client);
  };
