import React, { useMemo } from "react";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Avatar,
  Box,
  Text,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Spacer,
  HStack,
  Button,
  AvatarBadge,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { CalendarIcon, StarIcon } from "@chakra-ui/icons";
import { GetServerSidePropsContext } from "next";
import { withApollo } from "../src/hoc/withApollo";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GET_USER_POINTS } from "../src/queries/user";

interface Props {
  userPoints?: number;
}

export default function UserDashboard({ userPoints = 0 }: Props) {
  const { user, isLoading } = useUser();
  const { t } = useTranslation("common");

  return (
    <Container maxW="full">
      <Flex flexDir="column" alignItems="center" gridGap={5}>
        <SkeletonCircle width={150} height={150} isLoaded={!isLoading}>
          <Avatar
            name={user?.name!}
            src={user?.picture!}
            width={150}
            size="full"
          />
        </SkeletonCircle>
        <Skeleton isLoaded={!isLoading}>
          <Heading as="h3" textStyle="h3" textAlign="center">
            {t("Welcome Back", { name: user?.name! })}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <HStack gridGap={2}>
            <Flex
              background="gray.100"
              px={5}
              borderRadius={30}
              alignItems="center"
              gridGap={5}
            >
              <Text>{t("Points", { points: Number(userPoints) })}</Text>
              <StarIcon color="yellow.300" />
            </Flex>
            <Button background="gray.100" borderRadius="100%" p={0}>
              <CalendarIcon m={2.5} />
            </Button>
          </HStack>
        </Skeleton>
      </Flex>
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
      const { data } = await client.query({ query: GET_USER_POINTS });

      return {
        props: {
          userPoints: data.userPointsAggregate.aggregate.sum.amount,
        },
      };
    }
  ),
});
