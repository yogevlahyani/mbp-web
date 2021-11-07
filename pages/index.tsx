import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box, Heading } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import useTranslation from 'next-translate/useTranslation';
import { GetServerSidePropsContext } from 'next';
import LogRocket from 'logrocket';
import { ContentHeader } from '../src/components/Home/ContentHeader';
import { withPageAuthRequired } from '../src/hoc/withPageAuthRequired';
import { getSession } from '../lib/session';

export default function Home() {
  const { user } = useUser();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!user) {
      return;
    }

    LogRocket.identify(user.sub!, {
      name: user.name!,
      email: user.email!,
      nickname: user.nickname!,
    });
  }, [user]);

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
  returnTo: '/sign-in',
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
