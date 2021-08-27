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

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Box}>
        <Flex align="center">
          <Avatar name={nickname as string} src={picture as string} size="sm" />
          <Text mx={3} display={["none", "block"]}>
            {nickname}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem display={["block", "none"]}>
          <Flex align="center">
            <Avatar
              name={nickname as string}
              src={picture as string}
              size="sm"
            />
            <Text mx={3} color="black">
              {nickname}
            </Text>
          </Flex>
        </MenuItem>
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
