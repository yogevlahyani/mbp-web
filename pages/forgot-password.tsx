import React from "react";
import { getSession } from 'next-auth/client';
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { ForgotPasswordComponent } from "../src/components/Authentication/ForgotPasswordComponent";

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>MyBodyPro | Sign In</title>
        <meta
          name="description"
          content="Fitness Kit Sign In"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={100}>
          <ForgotPasswordComponent />
      </Box>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  if (session?.accessToken) {
    const { res } = ctx;
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    return { props: {} };
  }

  return {
    props: {
      session,
    },
  };
}
