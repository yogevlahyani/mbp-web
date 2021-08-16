import React from "react";
import { Button, Flex, Link } from "@chakra-ui/react";

export const LoggedOutNav = () => (
  <Flex align="center">
    <Link
      textTransform="uppercase"
      _hover={{ textDecoration: "none", color: "tomato" }}
      mx={3}
      href="/instructors"
    >
      Start coaching
    </Link>
    <Link
      textTransform="uppercase"
      _hover={{ textDecoration: "none", color: "tomato" }}
      mx={3}
      href="/api/auth/login"
    >
      Sign In
    </Link>
    <Button
      as="a"
      textTransform="uppercase"
      bg="tomato"
      color="white"
      border="1px solid tomato"
      _hover={{ textDecoration: "none", color: "tomato", bg: "white" }}
      mx={3}
      size="sm"
      href="sign-up"
    >
      Sign Up
    </Button>
  </Flex>
);
