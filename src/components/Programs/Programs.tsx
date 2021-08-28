import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Box, BoxProps, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { GET_USER_PROGRAMS } from "../../queries/user";
import { Program, ProgramType } from "./Program";

interface Props extends BoxProps {}

export const Programs: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation("common");
  const { data, loading } = useQuery(GET_USER_PROGRAMS);

  const programs = useMemo(
    () =>
      data?.user_programs.map(
        ({ program }: { program: ProgramType }, index: number) => (
          <Program key={program.id} index={index} {...program} />
        )
      ),
    [data?.user_programs]
  );

  if (data?.user_programs && !data?.user_programs.length) {
    return <Box>No Programs yet</Box>;
  }

  return (
    <Box {...boxProps}>
      <Flex
        alignItems="center"
        gridGap={[1, 5]}
        flexDirection={["column", "row"]}
      >
        <Heading as="h2" fontSize="36px">
          {t("My Programs")}
        </Heading>
        <Box backgroundColor="#1A74E2" borderRadius="20px" py={1} px={3}>
          <Skeleton isLoaded={!loading}>
            <Text fontSize="20px">
              {t("Videos Completed", {
                completed: 1,
                total: programs?.length || 0,
              })}
            </Text>
          </Skeleton>
        </Box>
      </Flex>
      <Skeleton isLoaded={!loading}>
        {programs?.length && <VerticalTimeline>{programs}</VerticalTimeline>}
      </Skeleton>
    </Box>
  );
};
