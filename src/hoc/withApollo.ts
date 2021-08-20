import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ParsedUrlQuery } from "querystring";
import config from "../../config";

const {
  providers: { hasura },
} = config;

const httpLink = createHttpLink({
  uri: hasura.graphqlUrl,
});

type CallbackType<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetServerSidePropsContext<Q>,
  client: ApolloClient<NormalizedCacheObject>
) => Promise<GetServerSidePropsResult<P>>;

export const withApollo =
  (callback: CallbackType) => async (ctx: GetServerSidePropsContext) => {
    const session = getSession(ctx.req, ctx.res);

    const authLink = setContext((_, { headers }) => {
      const accessToken = session?.idToken;

      return {
        headers: {
          ...headers,
          authorization: accessToken && `Bearer ${accessToken}`,
        },
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    console.log("session", session);

    return callback(ctx, client);
  };
