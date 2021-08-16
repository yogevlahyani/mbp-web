import React, { useMemo } from "react";
import { Skeleton, Spacer } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NavBarContainer } from "./NavBarContainer";
import { LoggedOutNav } from "./LoggedOutNav";
import { LoggedInNav } from "./LoggedInNav";
import { useUser } from "@auth0/nextjs-auth0";

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
      boxShadow="0 4px 20px rgb(0 0 0 / 10%)"
    >
      <Logo
        w="100px"
        color={["black", "primary.500", "primary.500", "primary.500"]}
      />
      <Spacer />
      {renderRightNav}
    </NavBarContainer>
  );
};
