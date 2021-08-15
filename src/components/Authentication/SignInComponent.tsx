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
import { SignInForm } from "./SignInForm";
import { Logo } from "../NavBar/Logo";
import { useAuth } from "../../hooks/useAuth";

export const SignInComponent = () => {
  const { signIn } = useAuth();

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"}>
        <Stack align={"center"}>
        <Logo />
          <Heading fontSize={"4xl"}>Nice to have you back!</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={5} w="100%">
            <SignInForm onFormSubmit={signIn} />
            <Link textAlign="center" fontSize="xs" letterSpacing={.5} textTransform="uppercase" href="/forgot-password">Forgot Password</Link>
            <Text textAlign="center" fontSize="xs">Don’t have a account? <Link letterSpacing={.5} href="/sign-up">Sign Up</Link></Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
