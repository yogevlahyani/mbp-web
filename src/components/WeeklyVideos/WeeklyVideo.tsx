import React, { useMemo } from 'react';
import { AspectRatio, Box, BoxProps, Flex, Spacer, Text } from '@chakra-ui/react';

export interface WeeklyVideoProps {
  id?: string;
  name: string;
  url: string;
}

interface Props extends WeeklyVideoProps, BoxProps {
  hideDetails?: boolean;
}

export const WeeklyVideo: React.FC<Props> = ({
  name,
  url,
  hideDetails,
  ...boxProps
}) => {
  const video = useMemo(() => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      if (match && match[2].length === 11) {
        const youtubeId = match[2];

        return (
          <iframe
            title={name}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            width="100%"
            height="100%"
            allowFullScreen
          />
        );
      }
    }

    if (url.startsWith('https://drive.google.com/')) {
      const driveVideoId = url
        .split('https://drive.google.com/file/d/')[1]
        .split('/view')[0];
      const driveVideoUrl = `https://drive.google.com/file/d/uc?id=${driveVideoId}`;

      return (
        <iframe
          src={url.replace('/view', '/preview')}
          allowFullScreen={true}
          style={{ height: '100%', width: '100%', margin: 'auto' }}
          width="100%"
          height="100%"
        />
      );
    }

    return (
      <video controls playsInline muted style={{ height: '100%', margin: 'auto' }}>
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
      {...boxProps}
    >
      {video}
      {hideDetails ? null : (
        <Flex py="9px" px="10px" gridGap={1} alignItems="center">
          <Text isTruncated fontWeight="bold" fontSize="14px" color="#646464">
            {name}
          </Text>
          <Spacer />
          <Text fontSize="12px" color="#1A74E2">
            12:00
          </Text>
        </Flex>
      )}
    </Box>
  );
};
