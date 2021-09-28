import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  BoxProps,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { GET_USER_PROGRAMS } from '../../queries/user';
import { UserProgram, UserProgramType } from './UserProgram';
import { selectedProgramAtom } from './state';

interface Props extends BoxProps {}

export const UserPrograms: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation('common');
  const [selectedProgram, setSelectedProgram] = useRecoilState(selectedProgramAtom);
  const { data, loading } = useQuery(GET_USER_PROGRAMS);

  useEffect(() => {
    if (data?.user_programs && !selectedProgram) {
      setSelectedProgram(data?.user_programs[0]);
    }
  }, [data?.user_programs, setSelectedProgram, selectedProgram]);

  const userPrograms = useMemo(
    () =>
      data?.user_programs.map((userProgram: UserProgramType, index: number) => (
        <UserProgram key={userProgram.id} index={index} {...userProgram} />
      )),
    [data?.user_programs],
  );

  const completed = useMemo(
    () =>
      data?.user_programs.filter((userProgram: UserProgramType) => {
        const finishDate = moment(userProgram.starts_at).add(
          userProgram.program.program_weeks.length,
          'weeks',
        );

        return moment().isSameOrAfter(finishDate);
      }).length,
    [data?.user_programs],
  );

  if (data?.user_programs && !data?.user_programs.length) {
    return (
      <Box textAlign="center" my={20}>
        <Heading>{t('No Programs yet')}</Heading>
      </Box>
    );
  }

  return (
    <Box {...boxProps}>
      <Flex alignItems="center" gridGap={[1, 5]} flexDirection={['column', 'row']}>
        <Skeleton isLoaded={!loading}>
          <Heading as="h2" fontSize="36px">
            {t('My Programs')}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <Box backgroundColor="#1A74E2" borderRadius="20px" py={1} px={3}>
            <Text fontSize="20px">
              {t('Programs Completed', {
                completed,
                total: userPrograms?.length || 0,
              })}
            </Text>
          </Box>
        </Skeleton>
      </Flex>
      <Skeleton isLoaded={!loading} my={[5, 10]} overflowX="scroll">
        <Flex
          flexDirection="row"
          gridGap={[3, 10]}
          position="relative"
          width={['full', 'fit-content']}
        >
          <Divider
            orientation="horizontal"
            position="absolute"
            top="50%"
            zIndex={0}
            transform="translateY(-50%)"
            borderColor="white"
            borderTopWidth="2px"
            borderBottomWidth="2px"
            opacity={1}
          />
          {userPrograms}
        </Flex>
      </Skeleton>
    </Box>
  );
};
