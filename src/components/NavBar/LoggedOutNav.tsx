import React from 'react'
import { Button, Flex, Link } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

export const LoggedOutNav = () => {
  const { t } = useTranslation('common')

  return (
    <Flex align="center">
      <Link
        textTransform="uppercase"
        _hover={{ textDecoration: 'none', color: 'tomato' }}
        mx={3}
        href="/sign-in"
      >
        {t('Sign In')}
      </Link>
      <Button
        as="a"
        textTransform="uppercase"
        bg="tomato"
        color="white"
        border="1px solid tomato"
        _hover={{ textDecoration: 'none', color: 'tomato', bg: 'white' }}
        mx={3}
        size="sm"
        href="/sign-up"
      >
        {t('Sign Up')}
      </Button>
    </Flex>
  )
}
