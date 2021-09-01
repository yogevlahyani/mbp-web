import React from 'react';
import Link from 'next/link';
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

const theme = extendTheme({
	textStyles: {
		h1: {
			fontWeight: 'bold',
		},
	},
});

export const ContentHeader = () => {
	return (
		<>
			<Container mb="20" maxW="5xl" pt="-10" centerContent>
				<Flex
					h="600px"
					w="100%"
					align="flex-end"
					p="10"
					bgGradient="linear(to-l, #1A74E266, #00544800)"
					borderBottomLeftRadius="40px"
					borderBottomRightRadius="40px"
				>
					<Box>
						<Text fontWeight="bold" as="h1" fontSize="4xl">
							להתאמן וללמוד מהטובים ביותר
						</Text>
						<Text mt="2" mb="4">
							לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית.
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
							למד עוד
						</Button>
					</Box>
				</Flex>
			</Container>
		</>
	);
};
