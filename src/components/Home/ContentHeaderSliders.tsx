import React, { useMemo } from 'react';
import { Box, BoxProps, Flex, Heading, Container } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Slider from 'react-slick';
import { ContentHeaderSlider, ContentHeaderProps } from './ContentHeaderSlider';
import { attributes } from '../../../content/pages/home.md';

interface Props extends BoxProps {}

export const ContentHeaderSliders: React.FC<Props> = ({ ...boxProps }) => {
  const { t } = useTranslation('common');

  const { slider_images } = attributes;

  const contentHeaderSlides = useMemo(
    () =>
      slider_images.map((contentHeaderSlider: ContentHeaderProps) => (
        <ContentHeaderSlider {...contentHeaderSlider} />
      )),
    [slider_images],
  );

  return (
    <Slider
      rtl
      className="content-slider"
      fade={true}
      autoplay={true}
      draggable={true}
      dots={false}
      slidesToShow={1}
      infinite={false}
      arrows={false}
      speed={5000}
    >
      {contentHeaderSlides}
    </Slider>
  );
};
