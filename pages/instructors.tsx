import React from 'react';
import Head from 'next/head';
import { Box, Heading } from '@chakra-ui/react';

export default function Instructors() {
  return (
    <>
      <Head>
        <title>MyBodyPro | Become a Sport & Fitness expert</title>
        <meta
          name="description"
          content="Become a Sport & Fitness expert"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={200} textAlign="center">
        <Heading as="h1">Become a Sport & Fitness expert</Heading>
        <Heading as="h2" color="tomato">This is gonna be a killer instructors page!</Heading>
      </Box>
    </>
  );
}
