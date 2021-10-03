import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, StackProps, Heading, HStack } from '@chakra-ui/react';

interface Props extends StackProps {}

export const Logo = (stackProps: Props) => {
  return (
    <Link href="/" passHref>
      <HStack {...stackProps} as="a" gridGap={2} alignItems="center">
        <Heading as="h1" fontSize="lg" fontWeight="bold" lineHeight="28px">
          MyBodyPro
        </Heading>
      </HStack>
    </Link>
  );
};
