import React from 'react';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { SignInComponent } from '../src/components/Authentication/SignInComponent';
import { getSession } from '../lib/session';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>MyBodyPro | Sign In</title>
        <meta name="description" content="Sign In" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={100}>
        <SignInComponent />
      </Box>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx.req, ctx.res);

  if (session.user && session.token) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
}
