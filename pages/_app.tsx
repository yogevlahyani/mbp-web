import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ChakraProvider, Container, Flex } from '@chakra-ui/react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { NavBar } from '../src/components/NavBar/NavBar'
import '../styles/globals.css'
import { Footer } from '../src/components/Footer/Footer'
import theme from '../src/theme/theme'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

function MyBodyPro({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Head>
            <title>MyBodyPro | The most convenient way to work out</title>
            <meta name="description" content="The most convenient way to work out" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Flex
            flexDirection="column"
            justifyContent="space-between"
            minH="100vh"
            background="#000000 linear-gradient(180deg, #1A74E266 0%, #00544800 100%) 0% 0% no-repeat padding-box"
          >
            <NavBar />

            <Container maxW="full" minH="max-content" flex={1} flexGrow={1}>
              <Component {...pageProps} />
            </Container>

            <Footer />
          </Flex>
        </ChakraProvider>
      </UserProvider>
    </ApolloProvider>
  )
}
export default MyBodyPro
