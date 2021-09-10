import React, { useMemo } from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Checkbox,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Skeleton,
  Badge,
  SkeletonCircle,
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';
import { WeeklyVideo } from '../WeeklyVideos/WeeklyVideo';
import dg from '../../utils/dg';
import embedYoutubeUrl from '../../utils/youtube-url';

interface ExerciseType {
  id: string;
  name: string;
  instructions?: string;
  image?: string;
  video?: string;
}

export interface WorkoutExerciseType {
  id: string;
  order: number;
  kg: number;
  repeats: number;
  rest: number;
  sets: number;
  exercise: ExerciseType;
}

interface Props extends WorkoutExerciseType {}

export const WorkoutExercise: React.FC<Props> = ({
  order,
  kg,
  repeats,
  rest,
  sets,
  exercise: { id, name, instructions, image, video },
}) => {
  const { t } = useTranslation('common');

  const restTimeText = useMemo(() => {
    if (rest > 59) {
      return t('Rest In Minutes', {
        count: moment.duration(rest, 'seconds').asMinutes(),
      });
    }

    return t('Rest In Seconds', {
      count: moment.duration(rest, 'seconds').asSeconds(),
    });
  }, [t, rest]);

  return (
    <AccordionItem border="none">
      <Flex flexDirection={['column', 'row']} gridGap={1}>
        <AccordionButton
          as={Flex}
          width="100%"
          background="transparent linear-gradient(90deg, #CDE4FE 0%, #378AF0 100%) 0% 0% no-repeat padding-box"
          borderRadius="10px"
          overflow="hidden"
          flexDirection={['column-reverse', 'row']}
          _hover={{ backgroundColor: 'inherit', cursor: 'pointer' }}
        >
          <Box position="relative" width="auto" height="auto">
            <Checkbox
              position={['absolute', 'static']}
              left={1}
              top={2}
              colorScheme="green"
              width={['auto', '100%']}
              height={['auto', '100%']}
              borderColor={['black', 'white']}
              justifyContent="center"
              p={2}
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
          <Box p="21px" flex={[1, 3]}>
            <Heading size="lg">{name}</Heading>
            <Text fontSize="lg">{t('Sets Count', { count: sets })}</Text>
            <Text fontSize="lg">{t('Repeats Count', { count: repeats })}</Text>
            <HStack
              justifyContent={['center', 'flex-end']}
              alignItems="center"
              align={['center', 'end']}
            >
              <TimeIcon />
              <Text fontSize="lg">{restTimeText}</Text>
            </HStack>
          </Box>
          <Box flex={1} height="100%" width="100%">
            <Image
              src={image}
              alt={image}
              fallback={<Box background="gray.500" width="100%" height="100%" />}
            />
          </Box>
        </AccordionButton>
      </Flex>
      <AccordionPanel py={4}>
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
      </AccordionPanel>
    </AccordionItem>
  );
};
