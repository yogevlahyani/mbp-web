import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { Logo } from '../NavBar/Logo';

export const Footer = () => (
  <HStack
    as="footer"
    color="white"
    justifyContent="center"
    flexDirection="row-reverse"
    gridGap={1}
  >
    <Text fontSize="18px">Powered by</Text>
    <Logo />
  </HStack>
);
