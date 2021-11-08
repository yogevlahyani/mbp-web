import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { SignInComponent } from '../src/components/Authentication/SignInComponent';
import { getSession } from '../lib/session';

interface Props {
  loggedIn?: boolean;
}

export default function SignIn({ loggedIn }: Props) {
  const { replace } = useRouter();

  if (loggedIn) {
    return replace('/');
  }

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

  return {
    props: {
      loggedIn: session.user && session.token,
    },
  };
}
