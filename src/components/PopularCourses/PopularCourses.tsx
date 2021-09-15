import React, { useMemo } from 'react';
import { Box, BoxProps, Flex, Heading, Container } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Slider from 'react-slick';
import { PopularCourse, PopularCourseType } from './PopularCourse';
import { attributes } from '../../../content/pages/home.md';

export const PopularCourses = () => {
  const { t } = useTranslation('common');

  const { slider_images: courses } = attributes;

  const PopularCrouses = useMemo(
    () =>
      courses.map(
        (
          { slider_item: course }: { slider_item: PopularCourseType },
          index: number,
        ) => <PopularCourse key={index.toString()} {...course} />,
      ),
    [courses],
  );

  return (
    <Box>
      <Flex alignItems="center" gridGap={[1, 5]} flexDirection={['column', 'row']}>
        <Container mb="10" maxW="5xl">
          <Heading as="h2" fontSize="36px">
            {t('Popular Courses')}
          </Heading>
        </Container>
      </Flex>
      <Box mb={10} width="full">
        <Slider
          rtl
          className="center"
          centerMode={true}
          centerPadding="00px"
          slidesToShow={5}
          infinite={false}
          arrows={false}
          speed={500}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                centerPadding: '0px',
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                centerPadding: '0px',
              },
            },
          ]}
        >
          {PopularCrouses}
        </Slider>
      </Box>
    </Box>
  );
};
