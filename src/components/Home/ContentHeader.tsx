import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { attributes, react as HomeContent } from '../../../content/pages/home.md';
import {
  Container,
  Box,
  HTMLChakraProps,
  Heading,
  Flex,
  Text,
  extendTheme,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { ContentHeaderSliders } from './ContentHeaderSliders';

export const ContentHeader = () => {
  const { t } = useTranslation('common');

  const { hero_title, hero_description } = attributes;

  return (
    <Container mb="20" maxW="5xl" centerContent>
      <Flex
        h="600px"
        w="100%"
        align="flex-end"
        bgGradient="linear(to-tl, #1A74E266, #00544800)"
        borderBottomLeftRadius="40px"
        borderBottomRightRadius="40px"
      >
        <ContentHeaderSliders />
      </Flex>
    </Container>
  );
};
