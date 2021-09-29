import React from 'react';
import { chakra, IconButton, IconButtonProps } from '@chakra-ui/react';
import { ArrowBendUpRight } from 'phosphor-react';

interface Props extends Omit<IconButtonProps, 'aria-label'> {}

const ArrowBendUpRightIcon = chakra(ArrowBendUpRight);

export const GoBackButton: React.FC<Props> = (iconProps) => {
  return (
    <IconButton
      {...iconProps}
      aria-label="Go Back"
      icon={<ArrowBendUpRightIcon size={20} />}
      size="md"
      onClick={() => (window.location.href = '/')}
      variant="solid"
      colorScheme="twitter"
    />
  );
};
