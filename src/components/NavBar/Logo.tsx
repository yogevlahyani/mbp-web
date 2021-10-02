import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, HTMLChakraProps } from '@chakra-ui/react';

interface Props extends HTMLChakraProps<'div'> {}

export const Logo = (props: Props) => {
  return (
    <Box {...props}>
      <Link href="/" passHref>
        <a>
          <Image src="/logo.svg" alt="MyBodyPro" height="260px" width="1657px" />
        </a>
      </Link>
    </Box>
  );
};
