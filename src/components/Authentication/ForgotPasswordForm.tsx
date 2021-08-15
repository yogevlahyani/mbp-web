import { Button, FormControl, Input, Stack } from "@chakra-ui/react";
import React from "react";

export const ForgotPasswordForm = () => {
  return (
    <Stack spacing={4}>
      <FormControl id="email">
        <Input type="email" placeholder="Enter Your Email Address" />
      </FormControl>
      <Stack spacing={10}>
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          textTransform="uppercase"
        >
          Confirm Email
        </Button>
      </Stack>
    </Stack>
  );
};
