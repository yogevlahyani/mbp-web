import React, { useEffect, useState, useMemo } from 'react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider, Container, Flex } from '@chakra-ui/react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RecoilRoot } from 'recoil';
import { DefaultSeo } from 'next-seo';
import LogRocket from 'logrocket';
import OneSignal from 'react-onesignal';
import { Header } from '../src/components/NavBar/Header';
import { EnvBadge } from '../src/components/EnvBadge';
import { Footer } from '../src/components/Footer/Footer';
import { InstallationInstructions } from '../src/components/InstallationInstructions';
import theme from '../src/theme/theme';
import config from '../config';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.css';

if (config.isProduction) {
  LogRocket.init(config.providers.logRocket.appId);
}

const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
  if (response) console.log(`[Response]: ${response}`);
  if (operation) console.log(`[Operation]: ${operation}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, new HttpLink({ uri: '/api/graphql' })]),
});

function MyBodyPro({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (config.isProduction) {
      (window as any).OneSignal = (window as any).OneSignal || [];
      OneSignal.init(config.providers.oneSignal);
    }
  }, []);

  const title = useMemo(() => 'MyBodyPro | The most convenient way to work out', []);
  const description = useMemo(() => 'The most convenient way to work out', []);

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <DefaultSeo
              noindex={!config.isProduction}
              nofollow={!config.isProduction}
              title={title}
              description={description}
            />
            <Head>
              <title>{title}</title>
              <meta
                name="description"
                content="The most convenient way to work out"
              />
              <link rel="icon" href="/favicon.ico" />
              <script async src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" />
            </Head>

            <Flex
              flexDirection="column"
              justifyContent="space-between"
              height="100vh"
              background="#000000 linear-gradient(180deg, #1A74E266 0%, #00544800 100%) 0% 0% no-repeat padding-box"
              overflowX="auto"
            >
              <Header />

              <Container
                maxW="full"
                minH="max-content"
                py={0}
                px={0}
                pb={10}
                flex={1}
                flexGrow={1}
              >
                <Component {...pageProps} />
              </Container>

              <Footer />
            </Flex>
            <EnvBadge />
            <InstallationInstructions />
          </ChakraProvider>
        </RecoilRoot>
      </UserProvider>
    </ApolloProvider>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const { isProduction } = config;

  if (isProduction) {
    LogRocket.captureMessage('vitals', {
      extra: metric,
    });
  }
}

export default MyBodyPro;
