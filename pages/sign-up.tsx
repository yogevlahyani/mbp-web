import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { Box } from "@chakra-ui/react";
import { SignUpComponent } from "../src/components/Authentication/SignUpComponent";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>MyBodyPro | Sign Up</title>
        <meta name="description" content="Fitness Kit Sign Up" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={100}>
        <SignUpComponent />
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
