import React from "react";
import Link from "next/link";
import { Box, HTMLChakraProps, Text } from "@chakra-ui/react";

interface Props extends HTMLChakraProps<"div"> {}

export const Logo = (props: Props) => {
  return (
    <Box {...props}>
      <Link href="/" passHref>
        <a>
          <Text fontSize="lg" fontWeight="bold">
            MyBodyPro
          </Text>
        </a>
      </Link>
    </Box>
  );
};
