import React from 'react';
import { Box, Flex, Spacer, Text, Image } from '@chakra-ui/react';

export interface PopularCourseType {
  title: string;
  description: String;
  image: string;
}

interface Props extends PopularCourseType {}

export const PopularCourse: React.FC<Props> = ({ title, description, image }) => {
  return (
    <Box
      mx={10}
      borderRadius={10}
      background="#97D7D7"
      overflow="hidden"
      color="#646464"
    >
      <Image src={image} alt={title} />
      <Flex py="9px" px="10px" gridGap={1} alignItems="center">
        <Text isTruncated fontWeight="bold" fontSize="21px" color="#646464">
          {title}
        </Text>
        <Spacer />
        <Text fontSize="16px" color="#1A74E2">
          {description}
        </Text>
      </Flex>
    </Box>
  );
};
