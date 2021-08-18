import React, { useMemo } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Skeleton, Spacer } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NavBarContainer } from "./NavBarContainer";
import { LoggedOutNav } from "./LoggedOutNav";
import { LoggedInNav } from "./LoggedInNav";
import { LanguageSelector } from "./LanguageSelector";

export const NavBar = () => {
  const { user, isLoading } = useUser();

  const renderRightNav = useMemo(() => {
    if (isLoading) {
      return <Skeleton w={300} height={5} />;
    }

    return !!user ? <LoggedInNav {...user} /> : <LoggedOutNav />;
  }, [isLoading, user]);

  return (
    <NavBarContainer
      backgroundColor="white"
      position="sticky"
      top={0}
      left={0}
      background="transparent linear-gradient(180deg, #1A74E2 0%, #225EA8 100%) 0% 0% no-repeat padding-box"
      color="white"
    >
      <Logo
        w="100px"
      />
      <Spacer />
      <LanguageSelector />
      {renderRightNav}
    </NavBarContainer>
  );
};
