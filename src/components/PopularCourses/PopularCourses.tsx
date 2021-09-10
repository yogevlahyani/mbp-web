import React, { useMemo } from 'react';
import { Box, BoxProps, Flex, Heading, Container } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Slider from 'react-slick';
import { PopularCourse, PopularCourseProps } from './PopularCourse';
import { attributes } from '../../../content/pages/home.md';

interface Props extends BoxProps {}

export const PopularCourses: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation('common');

  const { slider_images } = attributes;

  const _PopularCrouses = useMemo(
    () =>
      slider_images.map((popularCourse: PopularCourseProps) => (
        <PopularCourse {...popularCourse} />
      )),
    [slider_images],
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
          {_PopularCrouses}
        </Slider>
      </Box>
    </Box>
  );
};
