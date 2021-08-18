import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Box, ChakraProvider, Container, Flex } from "@chakra-ui/react";
import { NavBar } from "../src/components/NavBar/NavBar";
import "../styles/globals.css";
import { Footer } from "../src/components/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyBodyPro({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Head>
          <title>MyBodyPro | The most convenient way to work out</title>
          <meta
            name="description"
            content="The most convenient way to work out"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Flex
          flexDirection="column"
          justifyContent="space-between"
          minH="100vh"
          background="#000000 linear-gradient(180deg, #1A74E266 0%, #00544800 100%) 0% 0% no-repeat padding-box"
        >
          <NavBar />

          <Container maxW="full" minH="max-content" p={10}>
            <Component {...pageProps} />
          </Container>

          <Footer />
        </Flex>
      </ChakraProvider>
    </UserProvider>
  );
}
export default MyBodyPro;
