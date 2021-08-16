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
import RouterLink from "next/link";

interface Props extends UserProfile {}

export const LoggedInNav = ({ nickname, picture }: Props) => {
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
    <Menu>
      <MenuButton as={Box}>
        {userRow}
      </MenuButton>
      <MenuList>
        <MenuItem>{userRow}</MenuItem>
        <MenuDivider />
        <MenuGroup
          title="Profile"
          fontSize="smaller"
          textTransform="uppercase"
          color="tomato"
        >
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              My profile
            </Text>
          </MenuItem>
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              Settings
            </Text>
          </MenuItem>
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              Become an instructor
            </Text>
          </MenuItem>
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              My subscriptions
            </Text>
          </MenuItem>
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              Credits
            </Text>
          </MenuItem>
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              Invite friends
            </Text>
          </MenuItem>
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              Test your device
            </Text>
          </MenuItem>
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              Help center & FAQ
            </Text>
          </MenuItem>
        </MenuGroup>
        <MenuGroup
          title="Gift Card"
          fontSize="smaller"
          textTransform="uppercase"
          color="tomato"
        >
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              Send a gift card
            </Text>
          </MenuItem>
          <MenuItem>
            <Text as="strong" textTransform="uppercase" fontSize="smaller">
              Redeem a gift card
            </Text>
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem>
          <Link
            fontSize="smaller"
            textTransform="uppercase"
            _hover={{ textDecoration: "none", color: "tomato" }}
            as={RouterLink}
            href="/sign-out"
          >
            Sign out
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
