import React from "react";
import Head from "next/head";
import { Box, Heading } from '@chakra-ui/react';

export default function Instructors() {
  return (
    <>
      <Head>
        <title>MyBodyPro | Join to your all-in-one fitness kit</title>
        <meta
          name="description"
          content="Join to your all-in-one fitness kit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={200} textAlign="center">
        <Heading as="h1">Join to your all-in-one fitness kit</Heading>
        <Heading as="h2" color="tomato">This is gonna be a killer instructors page!</Heading>
      </Box>
    </>
  );
}
