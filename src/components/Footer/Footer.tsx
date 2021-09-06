import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Logo } from '../NavBar/Logo';

export const Footer = () => (
  <Flex as="footer" color="white" justifyContent="center">
    Powered by &nbsp; <Logo />
  </Flex>
);
