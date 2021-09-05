import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
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
} from '@chakra-ui/react'

export const ContentHeader = () => {
	const { t } = useTranslation('common')

	return (
		<>
			<Container mb='20' maxW='5xl' centerContent>
				<Flex
					h='600px'
					w='100%'
					align='flex-end'
					p='10'
					bgGradient='linear(to-l, #1A74E266, #00544800)'
					borderBottomLeftRadius='40px'
					borderBottomRightRadius='40px'
				>
					<Box>
						<Text fontWeight='bold' as='h1' fontSize='4xl'>
							{t('Workout and learn from the best')}
						</Text>
						<Text mt='2' mb='4'>
							{t('Loren ipsum dolor')}
						</Text>
						<Button
							fontSize='21px'
							fontWeight='normal'
							size='lg'
							border='2px'
							pl='10'
							pr='10'
							colorScheme='blue'
						>
							{t('Learn more')}
						</Button>
					</Box>
				</Flex>
			</Container>
		</>
	)
}
