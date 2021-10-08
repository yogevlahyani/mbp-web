import { Flex, HTMLChakraProps } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

interface Props extends HTMLChakraProps<'div'> {}

export const NavBarContainer = ({
  children,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={4}
      fontSize="small"
      {...props}
    >
      {children}
    </Flex>
  );
};
