import React, { useMemo } from 'react';
import { Box, BoxProps, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import Slider from 'react-slick';
import { GET_WEEKLY_VIDEOS } from '../../queries/workouts';
import { WeeklyVideo, WeeklyVideoProps } from './WeeklyVideo';

interface VideoHistoryType {
  offset: number;
  is_completed: boolean;
}

interface Props extends BoxProps {
  weekId: string;
}

export const WeeklyVideos: React.FC<Props> = ({ weekId, ...boxProps }) => {
  const { t } = useTranslation('common');

  const { data, loading } = useQuery(GET_WEEKLY_VIDEOS, {
    variables: { weekId },
  });
  const videos = useMemo(() => data?.program_week_videos || [], [data]);
  const completedVideos = useMemo(
    () =>
      data?.user_videos_history?.filter(
        ({ is_completed }: VideoHistoryType) => !!is_completed,
      ).length || 0,
    [data],
  );

  const weeklyVideos = useMemo(
    () =>
      videos.map((weeklyVideo: WeeklyVideoProps) => (
        <WeeklyVideo key={weeklyVideo.id} {...weeklyVideo} />
      )),
    [videos],
  );

  if (!videos.length) {
    return null;
  }

  return (
    <Box {...boxProps}>
      <Flex alignItems="center" gridGap={[1, 5]} flexDirection={['column', 'row']}>
        <Skeleton isLoaded={!loading}>
          <Heading as="h5" fontSize="22px">
            {t('Weekly Videos')}
          </Heading>
        </Skeleton>
        <Box backgroundColor="#1A74E2" borderRadius="20px" py={1} px={3}>
          <Skeleton isLoaded={!loading}>
            <Text fontSize="18px">
              {t('Videos Completed', {
                completed: completedVideos,
                total: videos.length,
              })}
            </Text>
          </Skeleton>
        </Box>
      </Flex>
      <Box my={10} px={15} width="full">
        <Skeleton isLoaded={!loading}>
          <Slider
            slidesToShow={3}
            infinite={false}
            arrows={true}
            speed={500}
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  centerPadding: '0px',
                },
              },
            ]}
          >
            {weeklyVideos}
          </Slider>
        </Skeleton>
      </Box>
    </Box>
  );
};
