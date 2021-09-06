import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { Box, Heading } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { ContentHeader } from '../src/components/Home/ContentHeader';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>MyBodyPro | The most convenient way to work out</title>
        <meta name="description" content="The most convenient way to work out" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <ContentHeader />
        <Heading as="h1" textAlign="center" color="white">
          {t('This is gonna be a killer home page!')}
        </Heading>
      </Box>
    </>
  );
}
