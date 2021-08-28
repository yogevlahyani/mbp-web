import React, { useCallback, useMemo } from 'react';
import { Avatar, Tooltip, Heading } from '@chakra-ui/react';
import { UserProfile } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

export interface ProgramType {
  id: string;
  name: string;
  description?: string;
  image?: string;
  author: UserProfile;
  created_at: string;
  updated_at?: string;
}

interface Props extends ProgramType {
  index: number;
}

export const Program: React.FC<Props> = ({
  id,
  name,
  author,
  created_at,
  index,
}) => {
  const { push, asPath } = useRouter();

  const icon = useMemo(
    () => (
      <Tooltip
        hasArrow
        placement="top"
        label={(author.name || author.nickname) as string}
        bg="black"
      >
        <Avatar
          name={(author.name || author.nickname) as string}
          src={author.picture as string}
          width="full"
          height="full"
        />
      </Tooltip>
    ),
    [author],
  );

  const onProgramClick = useCallback(
    () => push(`programs/${id}`),
    [push, asPath, id]
  );

  const onAuthorClick = useCallback(
    () => push(`/${author.nickname}`),
    [push, author],
  );

  return (
    <VerticalTimelineElement
      date={created_at}
      icon={icon}
      position="right"
      onTimelineElementClick={onProgramClick}
      iconOnClick={onAuthorClick}
    >
      <Heading as="h5" color="black">
        {name}
      </Heading>
    </VerticalTimelineElement>
  );
};
