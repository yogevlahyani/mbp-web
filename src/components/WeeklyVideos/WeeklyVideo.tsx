import React, { useMemo } from "react";
import { AspectRatio, Box, Flex, Spacer, Text } from "@chakra-ui/react";

export interface WeeklyVideoProps {
  id: string;
  name: string;
  url: string;
}

export const WeeklyVideo: React.FC<WeeklyVideoProps> = ({ name, url }) => {
  const video = useMemo(() => {
    if (url.includes("youtube.com")) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      if (match && match[2].length === 11) {
        const youtubeId = match[2];

        return (
          <iframe
            title={name}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            width="100%"
            allowFullScreen
          />
        );
      }
    }

    return (
      <video controls>
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    );
  }, [url, name]);

  return (
    <Box
      mx={10}
      borderRadius={10}
      background="#97D7D7"
      overflow="hidden"
      color="#646464"
    >
      <AspectRatio>{video}</AspectRatio>
      <Flex py="9px" px="10px" gridGap={1} alignItems="center">
        <Text fontSize="14px" isTruncated>{name}</Text>
        <Spacer />
        <Text fontSize="12px" color="#1A74E2">12:00</Text>
      </Flex>
    </Box>
  );
};
