import React, { useMemo } from 'react';
import { Box, BoxProps, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import Slider from 'react-slick';
import { GET_USER_WEEKLY_VIDEOS } from '../../queries/user';
import { WeeklyVideo, WeeklyVideoProps } from './WeeklyVideo';

interface Props extends BoxProps {}

export const WeeklyVideos: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation('common');
  const { data, loading } = useQuery(GET_USER_WEEKLY_VIDEOS, {
    variables: { weekNumber: 1 },
  });
  const videos = useMemo(() => data?.program_week_videos || [], [data]);
  const completedVideos = useMemo(
    () => data?.user_videos_history?.length || 0,
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
        <Heading as="h2" fontSize="36px">
          {t('Weekly Videos')}
        </Heading>
        <Box backgroundColor="#1A74E2" borderRadius="20px" py={1} px={3}>
          <Skeleton isLoaded={!loading}>
            <Text fontSize="20px">
              {t('Videos Completed', {
                completed: completedVideos,
                total: videos.length,
              })}
            </Text>
          </Skeleton>
        </Box>
      </Flex>
      <Box my={10} width="full">
        <Slider
          rtl
          centerMode
          centerPadding="60px"
          slidesToShow={3}
          infinite={false}
          arrows={false}
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
      </Box>
    </Box>
  );
};
