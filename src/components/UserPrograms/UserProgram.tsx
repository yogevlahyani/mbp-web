import React, { useCallback, useMemo } from 'react';
import { Avatar, Tooltip, Text, Box, Flex, Button } from '@chakra-ui/react';
import { UserProfile } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { selectedProgramAtom } from './state';
import { ProgramWeekType } from '../ProgramWeeks/ProgramWeek';

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

export const UserProgram: React.FC<Props> = ({ id, program, starts_at }) => {
  const { push } = useRouter();
  const [selectedProgram, setSelectedProgram] = useRecoilState(selectedProgramAtom);

  const onProgramClick = useCallback(
    () => setSelectedProgram({ id, program, starts_at }),
    [setSelectedProgram, id, program, starts_at],
  );

  const onAuthorClick = useCallback(
    () => push(`/${program.author.nickname}`),
    [push, program.author.nickname],
  );

  const isOpen = useMemo(() => {
    const startsAt = moment(starts_at);

    return moment().isSameOrAfter(startsAt);
  }, [starts_at]);

  const isActive = useMemo(
    () => selectedProgram?.program?.id === program.id,
    [selectedProgram, program.id],
  );

  const backgroundColor = useMemo(() => {
    // Should be only one
    if (isActive) {
      return 'blue.700';
    }

    // Should be multiple
    if (isOpen) {
      return 'blue.500';
    }

    return 'white';
  }, [isActive, isOpen]);

  return (
    <Flex
      backgroundColor={backgroundColor}
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
          width={['50px', '70px']}
          height={['50px', '70px']}
          onClick={onAuthorClick}
        />
      </Tooltip>
      <Tooltip hasArrow placement="top" label={program.name} bg="black">
        <Button
          onClick={onProgramClick}
          variant="ghost"
          _hover={{ background: 'none' }}
          _focus={{ border: 'none' }}
          _active={{ opacity: 1 }}
          disabled={!isOpen}
          height="100%"
          px={3}
        >
          <Text color={isOpen ? '#FFFFFF' : '#8D8D8D'} isTruncated>
            {program.name}
          </Text>
        </Button>
      </Tooltip>
    </Flex>
  );
};
