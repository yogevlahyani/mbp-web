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
        muted
        controls
        playsinline
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              id: 'video',
              style: {
                objectFit: 'cover',
                height: '100%',
              },
            },
          },
        }}
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
        px="10px"
        gridGap={1}
        alignItems="center"
        flexDirection="row-reverse"
      >
        <Text isTruncated fontWeight="bold" fontSize="12px">
          {name}
        </Text>
        <Spacer />
        <Text fontSize="12px">{duration}</Text>
      </Flex>
    );
  }, [hideDetails, name, duration]);

  return (
    <Box px={5}>
      <Box borderRadius={10} background="blue.500" overflow="hidden" color="white">
        <Box {...boxProps}>{video}</Box>
        {details}
      </Box>
    </Box>
  );
};
