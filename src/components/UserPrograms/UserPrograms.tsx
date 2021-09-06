import React, { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  BoxProps,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { GET_USER_PROGRAMS } from "../../queries/user";
import { UserProgram, UserProgramType } from "./UserProgram";
import moment from "moment";
import { useSetRecoilState } from "recoil";
import { selectedProgramAtom } from "./state";

interface Props extends BoxProps {}

export const UserPrograms: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation("common");
  const setSelectedProgram = useSetRecoilState(selectedProgramAtom);
  const { data, loading } = useQuery(GET_USER_PROGRAMS);

  useEffect(() => {
    if (data?.user_programs) {
      setSelectedProgram(data?.user_programs[0].program);
    }
  }, [data?.user_programs, setSelectedProgram]);

  const userPrograms = useMemo(
    () =>
      data?.user_programs.map((userProgram: UserProgramType, index: number) => (
        <UserProgram key={userProgram.id} index={index} {...userProgram} />
      )),
    [data?.user_programs]
  );

  // const completed = useMemo(() => {
  //   console.log("data?.user_programs", data?.user_programs);
  //   const weeksCount = data?.user_programs?.reduce(
  //     (accumulator: number, currentValue: UserProgramType) => {
  //       return accumulator + currentValue.program.program_weeks.length;
  //     },
  //     0
  //   );

  //   return weeksCount;
  // }, [data?.user_programs]);

  const completed = useMemo(
    () =>
      data?.user_programs.filter((userProgram: UserProgramType) => {
        const finishDate = moment(userProgram.starts_at).add(
          userProgram.program.program_weeks.length,
          "weeks"
        );

        return moment().isSameOrAfter(finishDate);
      }).length,
    [data?.user_programs]
  );

  if (data?.user_programs && !data?.user_programs.length) {
    return <Box>No Programs yet</Box>;
  }

  return (
    <Box {...boxProps}>
      <Flex
        alignItems="center"
        gridGap={[1, 5]}
        flexDirection={["column", "row"]}
      >
        <Heading as="h2" fontSize="36px">
          {t("My Programs")}
        </Heading>
        <Box backgroundColor="#1A74E2" borderRadius="20px" py={1} px={3}>
          <Skeleton isLoaded={!loading}>
            <Text fontSize="20px">
              {t("Videos Completed", {
                completed,
                total: userPrograms?.length || 0,
              })}
            </Text>
          </Skeleton>
        </Box>
      </Flex>
      <Skeleton isLoaded={!loading} my={10} overflowX="scroll">
        <Flex gridGap={10} position="relative" width="fit-content">
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
