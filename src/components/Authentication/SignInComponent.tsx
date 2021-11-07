import React from 'react';
import { Flex, Stack, useColorModeValue, Box, Button } from '@chakra-ui/react';
import { Logo } from '../NavBar/Logo';
import useTranslation from 'next-translate/useTranslation';
import { GoogleLogo } from 'phosphor-react';
import config from '../../../config';

export const SignInComponent = () => {
  const { t } = useTranslation('common');
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width="container.sm">
        <Stack align={'center'}>
          <Logo />
          {/* <Heading fontSize={'4xl'}>Nice to have you back!</Heading> */}
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          justifyContent="center"
          textAlign="center"
        >
          <Button
            as="a"
            href={`${config.providers.auth.baseUrl}/auth/google`}
            leftIcon={<GoogleLogo />}
            variant="outline"
            colorScheme="blue"
          >
            {t('Sign in with Google')}
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};
