import React from "react";
import Head from "next/head";
import { Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>MyBodyPro | The most convenient way to work out</title>
        <meta
          name="description"
          content="The most convenient way to work out"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1" my={200} textAlign="center">This is gonna be a killer home page!</Heading>
    </>
  );
}
