import React, { useMemo } from "react";
import { UserProfile } from "@auth0/nextjs-auth0";
import {
  Avatar,
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

interface Props extends UserProfile {}

export const LoggedInNav = ({ nickname, picture }: Props) => {
  const { t } = useTranslation("common");

  const userRow = useMemo(
    () => (
      <Flex align="center">
        <Avatar name={nickname as string} src={picture as string} size="sm" />
        <Text mx={3}>{nickname}</Text>
      </Flex>
    ),
    [nickname, picture]
  );

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Box}>{userRow}</MenuButton>
      <MenuList>
        <MenuItem
          as={Link}
          href="/sign-out"
          fontSize="md"
          textTransform="uppercase"
          color="black"
        >
          {t("Sign out")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
