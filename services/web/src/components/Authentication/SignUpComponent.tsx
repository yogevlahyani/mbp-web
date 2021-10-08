import React from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { Logo } from '../NavBar/Logo';
import { SignUpForm } from './SignUpForm';

export const SignUpComponent = () => {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'}>
        <Stack align={'center'}>
          <Logo />
          <Heading fontSize={'4xl'}>Nice to meet you!</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={5} w="100%">
            <SignUpForm onFormSubmit={() => console.log('SignUp')} />
            <Text textAlign="center" fontSize="xs">
              Already have an account?{' '}
              <Link letterSpacing={0.5} href="/sign-in">
                Sign In
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
