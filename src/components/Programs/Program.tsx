import React, { useMemo } from "react";
import { Avatar, Box, Heading } from "@chakra-ui/react";
import {
  VerticalTimelineElement,
  VerticalTimelineElementProps,
} from "react-vertical-timeline-component";
import { UserProfile } from "@auth0/nextjs-auth0";

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
  const icon = useMemo(
    () => (
      <Avatar
        name={(author.nickname || author.name) as string}
        src={author.picture as string}
        width="full"
        height="full"
      />
    ),
    [author]
  );

  return (
    <VerticalTimelineElement date={created_at} icon={icon} position="right">
      <Heading as="h5" color="black">
        {name}
      </Heading>
    </VerticalTimelineElement>
  );
};
