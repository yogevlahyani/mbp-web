import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from '../../lib/session';

export type WithPageAuthRequiredOptions = {
  getServerSideProps?: GetServerSideProps;
  returnTo: string;
};

export function withPageAuthRequired({
  getServerSideProps,
  returnTo,
}: WithPageAuthRequiredOptions) {
  return async (ctx: any) => {
    const { token, user } = await getSession(ctx.req, ctx.res);

    if (!token || !user) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: returnTo,
        },
      };
    }

    if (getServerSideProps) {
      return getServerSideProps(ctx);
    }

    return {
      props: {},
    };
  };
}
