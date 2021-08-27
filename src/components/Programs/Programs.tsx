import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Box, BoxProps, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { GET_USER_PROGRAMS } from "../../queries/user";

interface Props extends BoxProps {}

export const Programs: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation("common");
  const { data, loading } = useQuery(GET_USER_PROGRAMS);
  const programs = useMemo(() => data?.user_programs || [], [data]);

  if (!programs.length) {
    return <Box>No Programs yet</Box>;
  }

  return (
    <Box {...boxProps}>
      <Flex alignItems="center" gridGap={[1, 5]} flexDirection={["column", "row"]}>
        <Heading as="h2" fontSize="36px">
        {t("My Programs")}
        </Heading>
        <Box backgroundColor="#1A74E2" borderRadius="20px" py={1} px={3}>
          <Skeleton isLoaded={!loading}>
            <Text fontSize="20px">
              {t("Videos Completed", {
                completed: 1,
                total: programs.length,
              })}
            </Text>
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  );
};
