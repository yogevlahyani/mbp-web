import React, { useCallback, useState } from 'react';
import {
  Flex,
  Stack,
  useColorModeValue,
  Box,
  Button,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FcGoogle } from 'react-icons/fc';
import { Logo } from '../NavBar/Logo';
import config from '../../../config';
import axios from 'axios';

export const SignInComponent: React.FC<{}> = () => {
  const { t } = useTranslation('common');
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = useCallback(async () => {
    try {
      const { data } = await axios.post(`/auth/login`, { username, password });
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
  }, [username, password, toast, t]);

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width={["container.xs", "container.sm"]}>
        <Stack align={'center'}>
          <Logo />
          <Heading fontSize={'4xl'}>{t('Sign in to your account')}</Heading>
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
            <FormControl id="email">
              <FormLabel color="blue.500">{t('Email Address')}</FormLabel>
              <Input type="email" color="blue.500" onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel color="blue.500">{t('Password')}</FormLabel>
              <Input type="password" color="blue.500" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onSignIn}
              >
                {t('Sign in')}
              </Button>
              <Button
                as="a"
                href={`${config.providers.auth.baseUrl}/auth/google?returnTo=${config.origin}/auth/callback`}
                leftIcon={<FcGoogle />}
                variant="outline"
                colorScheme="blue"
              >
                {t('Sign in with Google')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
