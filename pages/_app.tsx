import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Provider as NextAuthProvider } from "next-auth/client";
import { NavBar } from "../src/components/NavBar/NavBar";
import "../styles/globals.css";
import { Logo } from "../src/components/NavBar/Logo";
import { AuthProvider } from "../src/providers/AuthProvider";
import { Footer } from "../src/components/Footer/Footer";

function MyBodyPro({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ChakraProvider>
        <AuthProvider>
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
        </AuthProvider>
      </ChakraProvider>
    </NextAuthProvider>
  );
}
export default MyBodyPro;
