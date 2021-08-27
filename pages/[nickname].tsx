import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Container } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { withApollo } from "../src/hoc/withApollo";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GET_USER_PROGRAMS, GET_USER_WEEKLY_VIDEOS } from "../src/queries/user";
import { UserRepresentation } from "../src/components/UserRepresentation/UserRepresentation";
import { WeeklyVideos } from "../src/components/WeeklyVideos/WeeklyVideos";
import { Programs } from "../src/components/Programs/Programs";

export default function UserDashboard() {
  return (
    <Container maxWidth="container.xl">
      <UserRepresentation />
      <WeeklyVideos mt={[5, 20]} />
      <Programs mt={[5, 20]} />
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  // getServerSideProps: withApollo(
  //   async (
  //     ctx: GetServerSidePropsContext,
  //     client: ApolloClient<NormalizedCacheObject>
  //   ) => {
  //     const { data } = await client.query({ query: GET_USER_WEEKLY_VIDEOS });

  //     return {
  //       props: {
  //         videos: data.user_programs,
  //       },
  //     };
  //   }
  // ),
});
