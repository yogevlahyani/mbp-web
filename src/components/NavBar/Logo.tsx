import React from "react";
import Link from "next/link";
import { Box, HTMLChakraProps, Heading } from "@chakra-ui/react";

interface Props extends HTMLChakraProps<"div"> {}

export const Logo = (props: Props) => {
  return (
    <Box {...props}>
      <Link href="/" passHref>
        <a>
          <Heading as="h1" fontSize="lg" fontWeight="bold">
            MyBodyPro
          </Heading>
        </a>
      </Link>
    </Box>
  );
};
