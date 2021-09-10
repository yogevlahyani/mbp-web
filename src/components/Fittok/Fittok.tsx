import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Flex, Heading, Progress, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Slider from 'react-slick';
import { GET_WEEKDAY_WORKOUT_WITH_EXERCISES } from '../../queries/workouts';
import { FittokWeekdayWorkout } from './FittokWeekdayWorkout';
import { chain } from 'lodash';
import { FittokWorkoutWorkout } from './FittokWorkoutExercise';

interface Props {
  weekId: string;
  weekday: number;
}

export const Fittok: React.FC<Props> = ({ weekId, weekday }) => {
  const { t } = useTranslation('common');
  const [slideIndex, setSlideIndex] = useState(0);

  const { data, loading } = useQuery(GET_WEEKDAY_WORKOUT_WITH_EXERCISES, {
    variables: { weekId, weekday },
  });

  const slides = useMemo(
    () =>
      chain(data?.program_weeks_by_pk.program_week_workouts)
        .map(({ workout }) => [workout, ...workout.workouts_exercises])
        .flatMap()
        .map(({ exercise, __typename, ...rest }) =>
          exercise && __typename !== 'workouts'
            ? [
                { ...exercise, ...rest },
                exercise.exercises_muscles?.muscle && {
                  ...exercise.exercises_muscles?.muscle,
                },
              ]
            : { __typename: 'workouts', ...rest },
        )
        .flatMap()
        .compact()
        .uniqWith((item, nextItem) => {
          if (item.__typename === 'muscles') {
            return item.name === nextItem.name;
          }

          return false;
        })
        .value(),
    [data],
  );

  useEffect(() => {
    console.log('slides', slides);
  }, [slides]);

  const weekNumber = useMemo(() => data?.program_weeks_by_pk.week_number, [data]);

  const workouts = useMemo(
    () =>
      slides.map((slide, index: number) => {
        switch (slide.__typename) {
          case 'workouts':
            return <FittokWeekdayWorkout {...slide} />;
          case 'muscles':
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                display="flex !important"
                height="100%"
              >
                <Heading size="3xl" textTransform="capitalize" textAlign="center">
                  {t(slide.name)}
                </Heading>
              </Flex>
            );
          case 'exercises':
            return <FittokWorkoutWorkout {...slide} />;

          default:
            return <div key={`${slide.__typename}-${index}`} />;
        }
      }),
    [slides, t],
  );

  if (loading) {
    return null;
  }

  return (
    <>
      <Progress
        isAnimated={slideIndex < slides.length}
        hasStripe={slideIndex < slides.length}
        min={0}
        max={slides.length}
        value={slideIndex}
        zIndex={9999}
        colorScheme={
          slideIndex < slides.length / 2
            ? 'orange'
            : slideIndex < slides.length / 1.4
            ? 'blue'
            : 'green'
        }
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        height="calc(100vh - 80px)"
        width="100%"
      >
        <Slider
          vertical
          verticalSwiping
          swipeToSlide
          adaptiveHeight={true}
          arrows={false}
          dots={false}
          infinite={false}
          slidesToShow={1}
          slidesToScroll={1}
          afterChange={setSlideIndex}
        >
          <Flex
            gridGap={[0, 2]}
            flexDirection={['column', 'row']}
            alignItems={['center', 'flex-end']}
            height="100%"
            display="flex !important"
            justifyContent="center"
          >
            <Heading>{t('Week Number', { weekNumber })}</Heading>
            <Text fontSize="md" py={[0, 1]}>
              זמן משוער לאימון הוא 50:00 דק
            </Text>
          </Flex>
          {workouts}
        </Slider>
      </Box>
    </>
  );
};
