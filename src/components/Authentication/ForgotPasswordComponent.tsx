import React from "react";
import NextLink from 'next/link';
import {
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { Logo } from "../NavBar/Logo";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const ForgotPasswordComponent = () => {
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"}>
        <Stack align={"center"}>
        <Logo />
          <Heading fontSize={"4xl"}>Confirm Email to Reset Password</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={5} w="100%">
            <ForgotPasswordForm />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
