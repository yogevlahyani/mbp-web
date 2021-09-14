import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Flex, Spacer, Text, Image, Button } from '@chakra-ui/react';

export interface SliderItemType {
  title: string;
  description: String;
  image: string;
}

interface Props extends SliderItemType {}

export const ContentHeaderSlider: React.FC<Props> = ({
  title,
  description,
  image,
}) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      height="100%"
      p="10"
      pb="30"
      justifyContent="flex-end"
      alignItems="flex-end"
      textAlign="right"
    >
      <Image src={image} alt={title} />
      <Box zIndex="10">
        <Text fontWeight="bold" as="h1" fontSize="4xl">
          {title}
        </Text>
        <Text mt="2" mb="4">
          {description}
        </Text>
        <Button
          fontSize="21px"
          fontWeight="normal"
          size="lg"
          border="2px"
          pl="10"
          pr="10"
          colorScheme="blue"
        >
          {t('Learn more')}
        </Button>
      </Box>
    </Flex>
  );
};
