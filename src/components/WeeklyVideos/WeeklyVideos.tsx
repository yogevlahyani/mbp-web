import React from "react";
import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

interface Props extends BoxProps {}

export const WeeklyVideos: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation("common");

  return (
    <Box {...boxProps}>
      <Flex alignItems="center" gridGap={5}>
        <Heading as="h2" fontSize="36px">{t("Weekly Videos")}</Heading>
        <Box backgroundColor="#1A74E2" borderRadius="20px" py={1} px={3}>
            <Text fontSize="20px">{t("Videos Completed", { completed: 1, total: 3 })}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
