import React, { useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
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
import { ChevronDownIcon } from "@chakra-ui/icons";
import { UserInfo } from "../../services/fitnesskit.service";

interface Props extends UserInfo {
  signOut: () => void;
}

export const LoggedInNav = ({ username, photoUrl, signOut }: Props) => {
  const userRow = useMemo(
    () => (
      <Flex align="center">
        <Avatar name={username} src={photoUrl} size="sm" />
        <Text mx={3}>{username}</Text>
      </Flex>
    ),
    [username, photoUrl]
  );

  return (
    <Menu>
      <MenuButton as={Box} rightIcon={<ChevronDownIcon />}>
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
            onClick={signOut}
          >
            Sign out
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
