import React from 'react';
import { Container } from '@chakra-ui/react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { withApollo } from '../../../src/hoc/withApollo';
import { GetServerSidePropsContext } from 'next';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface Props {
  id: string;
}

export default function Program({ id }: Props) {
  return <Container maxWidth="container.xl">Program id - {id}</Container>;
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  getServerSideProps: withApollo(
    async (
      ctx: GetServerSidePropsContext,
      client: ApolloClient<NormalizedCacheObject>,
    ) => {
      const id = ctx.params?.id;

      return {
        props: { id },
      };
    },
  ),
});
