import React, { useCallback, useState } from 'react';
import {
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Button,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { Logo } from '../NavBar/Logo';

export const SignUpComponent = () => {
  const { t } = useTranslation('common');
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSignUp = useCallback(async () => {
    if (
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(firstName) ||
      isEmpty(lastName)
    ) {
      toast({
        status: 'error',
        title: t('Error'),
        description: t('All fields are required'),
      });

      return;
    }

    try {
      const nickname = email.split('@')[0];
      const { data } = await axios.post(`/auth/register`, {
        email,
        password,
        firstName,
        lastName,
        nickname,
      });
      window.location.href = `/auth/callback?access_token=${data.accessToken}`;
    } catch (error) {
      console.log(error);
      toast({
        status: 'error',
        title: t('Error'),
        description: t('Invalid username or password'),
        position: 'bottom',
      });
    }
  }, [email, password, toast, t, firstName, lastName]);

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width="container.sm">
        <Stack align={'center'}>
          <Logo />
          <Heading fontSize={'4xl'}>{t('Sign up')}</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          justifyContent="center"
          textAlign="center"
        >
          <Stack spacing={4}>
            <FormControl id="firstName">
              <FormLabel color="blue.500">{t('firstName')}</FormLabel>
              <Input
                type="text"
                color="blue.500"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel color="blue.500">{t('lastName')}</FormLabel>
              <Input
                type="text"
                color="blue.500"
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel color="blue.500">{t('Email Address')}</FormLabel>
              <Input
                type="email"
                color="blue.500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel color="blue.500">{t('Password')}</FormLabel>
              <Input
                type="password"
                color="blue.500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onSignUp}
              >
                {t('Sign up')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
