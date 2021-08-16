import React from "react";
import Head from "next/head";
import { Heading } from "@chakra-ui/react";
import useTranslation from 'next-translate/useTranslation';

export default function Home() {
  const { t } = useTranslation('common');

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

      <Heading as="h1" my={200} textAlign="center">
        {t("This is gonna be a killer home page!")}
      </Heading>
    </>
  );
}
