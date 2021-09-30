import React, { useEffect, useMemo } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Skeleton, Spacer } from '@chakra-ui/react';
import { Logo } from './Logo';
import { NavBarContainer } from './NavBarContainer';
import { LoggedOutNav } from './LoggedOutNav';
import { LoggedInNav } from './LoggedInNav';
import LogRocket from 'logrocket';

export const Header = () => {
  const { user, isLoading } = useUser();

  const userNavigation = useMemo(
    () => (user ? <LoggedInNav {...user} /> : <LoggedOutNav />),
    [user],
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    LogRocket.identify(user.sub!, {
      name: user.name!,
      email: user.email!,
      nickname: user.nickname!,
    });
  }, [user]);

  return (
    <NavBarContainer
      backgroundColor="white"
      position="sticky"
      top={0}
      left={0}
      background="rgba(0, 0, 0, 0.9)"
      color="white"
      zIndex={9999}
    >
      <Logo width="150px" />
      <Spacer />
      {/* TODO: Enable when multi language */}
      {/* <LanguageSelector /> */}
      <Skeleton isLoaded={!isLoading}>{userNavigation}</Skeleton>
    </NavBarContainer>
  );
};