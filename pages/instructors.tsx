import React from 'react';
import Head from 'next/head';
import { Box, Heading } from '@chakra-ui/react';

export default function Instructors() {
  return (
    <>
      <Head>
        <title>MyBodyPro | Sport & Fitness experts</title>
        <meta
          name="description"
          content="Sport & Fitness experts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={200} textAlign="center">
        <Heading as="h1">Sport & Fitness experts</Heading>
        <Heading as="h2" color="tomato">This is gonna be a killer instructors page!</Heading>
      </Box>
    </>
  );
}
