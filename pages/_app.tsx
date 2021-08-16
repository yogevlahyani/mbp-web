import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, Container } from "@chakra-ui/react";
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

          <main>
            <NavBar />
            <Container maxW="container.xl" minH="max-content">
              <Component {...pageProps} />
            </Container>
          </main>

          <Footer />
      </ChakraProvider>
    </UserProvider>
  );
}
export default MyBodyPro;
