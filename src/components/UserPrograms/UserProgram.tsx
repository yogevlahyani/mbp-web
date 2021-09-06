import React, { useCallback, useEffect, useMemo } from "react";
import { Avatar, Tooltip, Text, Box, Flex, Button } from "@chakra-ui/react";
import { UserProfile } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import moment from "moment";
import { useSetRecoilState } from "recoil";
import { selectedProgramAtom } from "./state";
import { ProgramWeekType } from "../ProgramWeeks/ProgramWeeks";

export interface ProgramType {
  id: string;
  name: string;
  description?: string;
  image?: string;
  author: UserProfile;
  program_weeks: ProgramWeekType[];
  created_at: string;
  updated_at?: string;
  starts_at: string;
}

export interface UserProgramType {
  id: string;
  program: ProgramType;
  starts_at: string;
}

interface Props extends UserProgramType {
  index: number;
}

export const UserProgram: React.FC<Props> = ({
  id,
  program,
  starts_at,
  index,
}) => {
  const { push, asPath } = useRouter();
  const setSelectedProgram = useSetRecoilState(selectedProgramAtom);

  const onProgramClick = useCallback(
    () => setSelectedProgram(program),
    [setSelectedProgram, program]
  );

  const onAuthorClick = useCallback(
    () => push(`/${program.author.nickname}`),
    [push, program.author.nickname]
  );

  const isOpen = useMemo(() => {
    const startsAt = moment(starts_at);

    return moment().isSameOrAfter(startsAt);
  }, [starts_at]);

  return (
    <Flex
      backgroundColor={isOpen ? "#1A74E2" : "#FFFFFF"}
      alignItems="center"
      borderRadius="10px"
      borderEndRadius={40}
      zIndex={2}
    >
      <Tooltip
        hasArrow
        placement="top"
        label={(program.author?.name || program.author?.nickname) as string}
        bg="black"
      >
        <Avatar
          name={(program.author?.name || program.author?.nickname) as string}
          src={program.author?.picture as string}
          width="70px"
          height="70px"
          onClick={onAuthorClick}
        />
      </Tooltip>
      <Tooltip hasArrow placement="top" label={program.name} bg="black">
        <Button
          variant="ghost"
          _hover={{ background: "none" }}
          _focus={{ border: "none" }}
          _active={{ opacity: 1 }}
          disabled={!isOpen}
          height="100%"
          px={3}
        >
          <Text
            color={isOpen ? "#FFFFFF" : "#8D8D8D"}
            onClick={onProgramClick}
            isTruncated
          >
            {program.name}
          </Text>
        </Button>
      </Tooltip>
    </Flex>
  );
};
