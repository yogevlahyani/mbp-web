import React, { useMemo, useState } from 'react';
import { Box, BoxProps, Flex, Spacer, Text } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import moment, { unitOfTime } from 'moment';

export interface VideoMetadata {
  durationMs: number;
}

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
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata>();

  const onDuration = (
    duration: number,
    unit: unitOfTime.DurationConstructor = 'seconds',
  ) =>
    setVideoMetadata({
      durationMs: moment.duration(duration, unit).asMilliseconds(),
    });

  const video = useMemo(() => {
    let videoUrl = url;

    if (url.startsWith('https://drive.google.com/')) {
      const driveVideoId = url
        .split('https://drive.google.com/file/d/')[1]
        .split('/view')[0];

      videoUrl = `https://drive.google.com/uc?export=download&id=${driveVideoId}`;
    }

    return (
      <ReactPlayer
        id="video"
        onDuration={onDuration}
        url={videoUrl}
        controls
        playsinline
        width="100%"
        height="100%"
      />
    );
  }, [url]);

  const duration = useMemo(
    () => moment.utc(videoMetadata?.durationMs || 0).format('mm:ss'),
    [videoMetadata],
  );

  const details = useMemo(() => {
    if (hideDetails) {
      return null;
    }

    return (
      <Flex
        py="9px"
        gridGap={1}
        alignItems="center"
        flexDirection="row-reverse"
        px={3}
      >
        <Text isTruncated fontWeight="bold" fontSize="16px">
          {name}
        </Text>
        <Spacer />
        <Text fontSize="16px">{duration}</Text>
      </Flex>
    );
  }, [hideDetails, name, duration]);

  return (
    <Box
      mx={5}
      borderRadius={10}
      overflow="hidden"
      background="blue.500"
      color="white"
      position="relative"
    >
      <Box {...boxProps}>{video}</Box>
      {details}
    </Box>
  );
};
