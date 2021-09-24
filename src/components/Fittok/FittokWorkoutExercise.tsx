import React, { useMemo } from 'react';
import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { WorkoutExerciseType } from '../WorkoutMuscles/WorkoutExercise';
import dg from '../../utils/dg';
import { WeeklyVideo } from '../WeeklyVideos/WeeklyVideo';

interface Props extends WorkoutExerciseType {
  name: string;
  image: string;
  video: string;
  instructions: string;
}

export const FittokWorkoutWorkout: React.FC<Props> = ({
  order,
  kg,
  repeats,
  rest,
  sets,
  name,
  image,
  instructions,
  video,
}) => {
  const { t } = useTranslation('common');

  const restTimeText = useMemo(() => {
    if (rest > 59) {
      return t('Minutes', {
        count: moment.duration(rest, 'seconds').asMinutes(),
      });
    }

    return t('Seconds', {
      count: moment.duration(rest, 'seconds').asSeconds(),
    });
  }, [rest, t]);

  return (
    <Flex flexDirection="column" display="flex !important">
      <Box height="auto" textAlign="right">
        <Checkbox
          colorScheme="green"
          justifyContent="flex-start"
          px={2}
          py={5}
          iconSize="5rem"
          sx={{
            '.chakra-checkbox__control': {
              width: ['32px', '66px'],
              height: ['32px', '66px'],
              boxSizing: 'border-box',
              borderRadius: '100%',
            },
            '.chakra-checkbox__control svg': {
              width: '70%',
            },
          }}
        />
      </Box>
      <Box>
        <Heading size="3xl" textTransform="capitalize" textAlign="center">
          {t(name)}
        </Heading>
        <Flex
          gridGap={10}
          flexDirection={['column', 'row']}
          justifyContent="space-between"
        >
          {image && (
            <Box height={270}>
              <Image
                src={dg(image)}
                alt={name}
                objectFit="cover"
                height="100%"
                fallback={<SkeletonCircle width="full" />}
                borderRadius="10px"
              />
            </Box>
          )}
          {video && (
            <Box height={270} width="100%">
              <WeeklyVideo
                name={name}
                url={video}
                height="100%"
                width="100%"
                m="0"
                hideDetails
              />
            </Box>
          )}
        </Flex>
        {instructions && (
          <Box my={10}>
            <Text fontSize="md" textAlign="center">
              {instructions}
            </Text>
          </Box>
        )}
        <Flex
          gridGap={5}
          flexDirection={['column', 'row']}
          textAlign={['center', 'start']}
        >
          <Box>
            <Text>{t('Sets')}</Text>
            <Badge colorScheme="purple" variant="solid">
              <Text>{t('Sets Count', { count: sets })}</Text>
            </Badge>
          </Box>
          <Box>
            <Text>{t('Repeats')}</Text>
            <Badge colorScheme="green" variant="solid">
              <Text>{t('Repeats Count', { count: sets })}</Text>
            </Badge>
          </Box>
          <Box>
            <Text>{t('Rest')}</Text>
            <Badge colorScheme="blue" variant="solid">
              <Text>{restTimeText}</Text>
            </Badge>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
