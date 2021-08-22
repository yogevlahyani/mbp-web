import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Container } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { withApollo } from "../src/hoc/withApollo";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GET_USER_POINTS, GET_USER_PROGRAMS } from "../src/queries/user";
import { UserRepresentation } from "../src/components/UserRepresentation/UserRepresentation";
import { WeeklyVideos } from "../src/components/WeeklyVideos/WeeklyVideos";

interface Props {
  programs: any[];
}

export default function UserDashboard({ programs }: Props) {
  return (
    <Container maxWidth="container.xl">
      <UserRepresentation />
      <WeeklyVideos mt={20} />
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  getServerSideProps: withApollo(
    async (
      ctx: GetServerSidePropsContext,
      client: ApolloClient<NormalizedCacheObject>
    ) => {
      const { data } = await client.query({ query: GET_USER_PROGRAMS });

      return {
        props: {
          programs: data.user_programs,
        },
      };
    }
  ),
});
