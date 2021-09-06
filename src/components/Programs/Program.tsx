import React, { useCallback, useEffect, useMemo } from "react";
import { Avatar, Tooltip, Text, Box, Flex } from "@chakra-ui/react";
import { UserProfile } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import moment from "moment";

export interface ProgramType {
  id: string;
  name: string;
  description?: string;
  image?: string;
  author: UserProfile;
  created_at: string;
  updated_at?: string;
  starts_at: string;
}

interface Props extends ProgramType {
  index: number;
}

export const Program: React.FC<Props> = ({
  id,
  name,
  author,
  created_at,
  starts_at,
  index,
}) => {
  const { push, asPath } = useRouter();

  const onProgramClick = useCallback(
    () => push(`programs/${id}`, asPath),
    [push, asPath, id]
  );

  const onAuthorClick = useCallback(
    () => push(`/${author.nickname}`),
    [push, author],
  );

  const isOpen = useMemo(() => {
    const startsAt = moment(starts_at);
    console.log('startsAt', startsAt);

    return false;
  }, [starts_at]);

  return (
    <Flex
      backgroundColor={isOpen ? 'blue' : 'white'}
      borderRadius="10px"
      alignItems="center"
      borderTopRightRadius={50}
      borderBottomRightRadius={50}
    >
      <Tooltip
        hasArrow
        placement="top"
        label={(author?.name || author?.nickname) as string}
        bg="black"
      >
        <Avatar
          name={(author?.name || author?.nickname) as string}
          src={author?.picture as string}
          width="70px"
          height="70px"
          onClick={onAuthorClick}
        />
      </Tooltip>
      <Tooltip hasArrow placement="top" label={name} bg="black">
        <Text
          color="black"
          px={5}
          maxWidth={200}
          onClick={onProgramClick}
          isTruncated
        >
          {name}
        </Text>
      </Tooltip>
    </Flex>
  );
};
