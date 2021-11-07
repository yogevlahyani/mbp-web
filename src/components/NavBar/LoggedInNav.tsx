import React from 'react';
import {
  Avatar,
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

interface UserProfile {
  nickname: string;
  picture: string;
}

interface Props extends UserProfile {}

export const LoggedInNav = ({ nickname, picture }: Props) => {
  const { push } = useRouter();
  const { t } = useTranslation('common');

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Box}>
        <Flex align="center">
          <Avatar name={nickname as string} src={picture as string} size="sm" />
          <Text mx={3} display={['none', 'block']}>
            {nickname}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem display={['block', 'none']}>
          <Flex align="center">
            <Avatar name={nickname as string} src={picture as string} size="sm" />
            <Text mx={3} color="black">
              {nickname}
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem
          onClick={() => push(`/${nickname}`)}
          fontSize="md"
          textTransform="uppercase"
          color="black"
        >
          {t('My Programs')}
        </MenuItem>
        <MenuItem
          onClick={() => push('/api/auth/logout')}
          fontSize="md"
          textTransform="uppercase"
          color="black"
        >
          {t('Sign out')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
