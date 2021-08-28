import React from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
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
