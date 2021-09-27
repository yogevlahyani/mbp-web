import React from 'react';
import Head from 'next/head';
import { Box, Heading } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { ContentHeader } from '../src/components/Home/ContentHeader';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from 'next';

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

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  getServerSideProps: async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx.req, ctx.res);

    // TODO: Show Public Profile
    if (session?.user.nickname !== ctx.params?.nickname) {
      return {
        redirect: {
          statusCode: 302,
          destination: `/${session?.user.nickname}`,
        },
      };
    }

    return {
      props: {},
    };
  },
});
