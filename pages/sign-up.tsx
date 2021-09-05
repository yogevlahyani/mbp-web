import React from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import { SignUpComponent } from '../src/components/Authentication/SignUpComponent'

export default function SignUp() {
  return (
    <>
      <Head>
        <title>MyBodyPro | Sign Up</title>
        <meta name="description" content="Sign Up" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={100}>
        <SignUpComponent />
      </Box>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  return {
    props: {},
  }
}
