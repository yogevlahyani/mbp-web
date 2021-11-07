import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  Heading,
  HStack,
  Skeleton,
  SkeletonCircle,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { CalendarIcon, CheckIcon, StarIcon } from '@chakra-ui/icons';
import { useUser } from '@auth0/nextjs-auth0';
import useTranslation from 'next-translate/useTranslation';
import { GET_USER_POINTS } from '../../queries/user';
import Trans from 'next-translate/Trans';

interface Props {}

export const UserRepresentation: React.FC<Props> = () => {
  const { user, isLoading } = useUser();
  const { t } = useTranslation('common');
  const { data, loading } = useQuery(GET_USER_POINTS);

  const userPoints = useMemo(
    () => data?.userPointsAggregate.aggregate.sum.amount,
    [data],
  );

  const name = useMemo(
    () => (user?.name?.includes('@') ? user.nickname || user.name : user?.name!),
    [user],
  );

  return (
    <Flex flexDir="column" alignItems="center" gridGap={5}>
      <SkeletonCircle width={150} height={150} isLoaded={!isLoading}>
        <Avatar name={user?.name!} src={user?.picture!} width={150} size="full">
          <Tooltip label="Hey, I'm here!" aria-label="A tooltip">
            <AvatarBadge boxSize="5.5em" bg="blue.500" right="2em" bottom="2em">
              <CheckIcon fontSize="2em" />
            </AvatarBadge>
          </Tooltip>
        </Avatar>
      </SkeletonCircle>
      <Skeleton isLoaded={!isLoading}>
        <Heading as="h3" textStyle="h3" textAlign="center">
          <Trans
            i18nKey="common:Welcome Back"
            values={{ name }}
            components={[<Text key="0" isTruncated />]}
          />
        </Heading>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        <HStack gridGap={2}>
          <Flex
            background="gray.100"
            px={5}
            borderRadius={30}
            alignItems="center"
            gridGap={5}
          >
            <Skeleton isLoaded={!loading}>
              <Text>{t('Points', { points: Number(userPoints) })}</Text>
            </Skeleton>
            <StarIcon color="yellow.300" />
          </Flex>
          <Button background="gray.100" borderRadius="100%" p={0}>
            <CalendarIcon m={2.5} />
          </Button>
        </HStack>
      </Skeleton>
    </Flex>
  );
};
