import React from 'react';
import { useRouter } from 'next/router';
import { chakra, IconButton, IconButtonProps } from '@chakra-ui/react';
import { ArrowBendUpRight } from 'phosphor-react';

interface Props extends Omit<IconButtonProps, 'aria-label'> {}

const ArrowBendUpRightIcon = chakra(ArrowBendUpRight);

export const GoBackButton: React.FC<Props> = (iconProps) => {
  const { pathname, push } = useRouter();

  if (pathname === '/[nickname]') {
    return null;
  }

  return (
    <IconButton
      {...iconProps}
      aria-label="Go Back"
      icon={<ArrowBendUpRightIcon size={20} />}
      size="md"
      onClick={() => push('/')}
      variant="solid"
      colorScheme="twitter"
    />
  );
};
