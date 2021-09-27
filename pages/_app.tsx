import React, { useEffect, useState, useMemo } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Badge, ChakraProvider, Container, Flex } from '@chakra-ui/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import { DefaultSeo } from 'next-seo';
import { NavBar } from '../src/components/NavBar/NavBar';
import '../styles/globals.css';
import { Footer } from '../src/components/Footer/Footer';
import theme from '../src/theme/theme';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import config from '../config';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

function MyBodyPro({ Component, pageProps }: AppProps) {
  const [showInstallMessage, setShowInstallMessage] = useState<boolean>(false);

  // Detects if device is on iOS
  const isIos = useMemo(() => {
    if (!process.browser) {
      return;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }, []);

  // Detects if device is in standalone mode
  const isInStandaloneMode = useMemo(() => {
    if (!process.browser) {
      return;
    }

    return 'standalone' in window.navigator && (window.navigator as any).standalone;
  }, []);

  useEffect(() => {
    // Checks if should display install popup notification:
    if (isIos && !isInStandaloneMode) {
      setShowInstallMessage(true);
    }
  }, [isIos, isInStandaloneMode]);

  const envBadge = useMemo(() => {
    console.log('config.isProduction', config.isProduction);
    if (config.isProduction) {
      return null;
    }

    const colorSchema =
      config.environment.toLowerCase() === 'staging' ? 'green' : 'red';

    return (
      <Badge
        position="fixed"
        bottom={3}
        left={3}
        zIndex={9999999999}
        colorScheme={colorSchema}
        p={1}
        textTransform="uppercase"
      >
        {config.environment}
      </Badge>
    );
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
            </Head>

            <Flex
              flexDirection="column"
              justifyContent="space-between"
              minH="100vh"
              background="#000000 linear-gradient(180deg, #1A74E266 0%, #00544800 100%) 0% 0% no-repeat padding-box"
            >
              <NavBar />

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
            {envBadge}
          </ChakraProvider>
        </RecoilRoot>
      </UserProvider>
    </ApolloProvider>
  );
}
export default MyBodyPro;
