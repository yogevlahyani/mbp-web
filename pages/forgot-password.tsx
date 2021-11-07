import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { ForgotPasswordComponent } from '../src/components/Authentication/ForgotPasswordComponent';

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>MyBodyPro | Sign In</title>
        <meta name="description" content="Sign In" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={100}>
        <ForgotPasswordComponent />
      </Box>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
