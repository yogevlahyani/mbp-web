import React, { useMemo } from "react";
import { Avatar, Box, Heading } from "@chakra-ui/react";
import { VerticalTimelineElement, VerticalTimelineElementProps } from "react-vertical-timeline-component";

export interface ProgramType {
  id: string;
  name: string;
  description?: string;
  image?: string;
  created_by: string;
  created_at: string;
  updated_at?: string;
}

interface Props extends ProgramType {
    index: number;
}

export const Program: React.FC<Props> = ({
  id,
  name,
  created_by,
  created_at,
  index,
}) => {
  const icon = useMemo(() => <Avatar name={created_by} width="full" height="full" />, [created_by]);

  return (
    <VerticalTimelineElement date={created_at} icon={icon} position="right">
      <Heading as="h5" color="black">{name}</Heading>
    </VerticalTimelineElement>
  );
};
