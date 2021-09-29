import React from 'react';
import { chakra, IconButton, IconButtonProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ArrowBendUpRight } from 'phosphor-react';

interface Props extends Omit<IconButtonProps, 'aria-label'> {}

const ArrowBendUpRightIcon = chakra(ArrowBendUpRight);

export const GoBackButton: React.FC<Props> = (iconProps) => {
  const { push } = useRouter();

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
