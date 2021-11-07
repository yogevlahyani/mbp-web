import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ParsedUrlQuery } from 'querystring';
import { getSession } from '../../lib/session';
import { getApolloClient } from '../../lib/apollo.client';

type CallbackType<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = (
  context: GetServerSidePropsContext<Q>,
  client: ApolloClient<NormalizedCacheObject>,
) => Promise<GetServerSidePropsResult<P>>;

export const withApollo =
  (callback: CallbackType) => async (ctx: GetServerSidePropsContext) => {
    const { token } = await getSession(ctx.req, ctx.res);

    const client = getApolloClient({ token });

    return callback(ctx, client);
  };
