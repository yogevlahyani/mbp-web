import React, { useEffect, useMemo } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Skeleton, Spacer } from '@chakra-ui/react';
import { Logo } from './Logo';
import { NavBarContainer } from './NavBarContainer';
import { LoggedOutNav } from './LoggedOutNav';
import { LoggedInNav } from './LoggedInNav';
import LogRocket from 'logrocket';
import { GoBackButton } from '../GoBackButton';

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
      position="sticky"
      top={0}
      left={0}
      bgGradient="linear(to-b, blackAlpha.900 0%, blackAlpha.700 25%, blackAlpha.500 50%, blackAlpha.300 75%, transparent 100%)"
      color="white"
      zIndex={9999}
    >
      <GoBackButton width="32px" height="32px" minWidth={0} />
      <Logo width="250px" flex={1} justifyContent={['center', 'flex-start']} />
      <Spacer display={['none', 'block']} />
      {/* TODO: Enable when multi language */}
      {/* <LanguageSelector /> */}
      <Skeleton isLoaded={!isLoading} width="min-content">
        {userNavigation}
      </Skeleton>
    </NavBarContainer>
  );
};
