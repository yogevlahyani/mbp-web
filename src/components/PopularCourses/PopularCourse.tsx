import React from 'react';
import { Box, Flex, Spacer, Text, Image } from '@chakra-ui/react';

interface SliderItemType {
  title: string;
  description: String;
  image: string;
}

export interface PopularCourseProps {
  slider_item: SliderItemType;
}

export const PopularCourse: React.FC<PopularCourseProps> = ({ slider_item }) => {
  return (
    <Box
      mx={10}
      borderRadius={10}
      background="#97D7D7"
      overflow="hidden"
      color="#646464"
    >
      <Image src={slider_item.image} />
      <Flex py="9px" px="10px" gridGap={1} alignItems="center">
        <Text isTruncated fontWeight="bold" fontSize="21px" color="#646464">
          {slider_item.title}
        </Text>
        <Spacer />
        <Text fontSize="16px" color="#1A74E2">
          {slider_item.description}
        </Text>
      </Flex>
    </Box>
  );
};
