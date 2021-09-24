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
  Tooltip,
  chakra,
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import { Link } from 'phosphor-react';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';
import { WeeklyVideo } from '../WeeklyVideos/WeeklyVideo';
import { Repeats } from './RepModes/Repeats';
import { Distance } from './RepModes/Distance';
import { Time } from './RepModes/Time';
import { BodyWeight } from './WeightModes/BodyWeight';
import { BPM } from './WeightModes/BPM';
import { RPE } from './WeightModes/RPE';
import { Speed } from './WeightModes/Speed';
import { Tempo } from './WeightModes/Tempo';
import { Weight } from './WeightModes/Weight';

interface ExerciseType {
  id: string;
  name: string;
  instructions?: string;
  image?: string;
  video?: string;
}

enum WeightMode {
  WEIGHT = 'weight',
  BODY_WEIGHT = 'body_weight',
  SPEED = 'speed',
  RPE = 'rpe',
  BPM = 'bpm',
  TEMPO = 'tempo',
}

enum RepMode {
  REPEATS = 'repeats',
  DISTANCE = 'distance',
  TIME = 'time',
}
export interface WorkoutExerciseType {
  id: string;
  order: number;
  weight_in_kg: number;
  repeats: number;
  set_rest_duration_in_seconds: number;
  sets: number;
  mode: WeightMode;
  rep_mode: RepMode;
  exercise: ExerciseType;
  distance_in_meters: number;
  time_in_seconds: number;
  bpm: number;
  rpe: number;
  speed_percentage: number;
  tempo: number;
  set_group?: string;
}

interface Props extends WorkoutExerciseType {}

const LinkIcon = chakra(Link);

export const WorkoutExercise: React.FC<Props> = ({
  repeats,
  set_rest_duration_in_seconds,
  sets,
  mode,
  rep_mode,
  distance_in_meters,
  time_in_seconds,
  bpm,
  rpe,
  speed_percentage,
  tempo,
  weight_in_kg,
  exercise: { id, name, instructions, image, video },
}) => {
  const { t } = useTranslation('common');

  const restTimeText = useMemo(() => {
    if (!set_rest_duration_in_seconds || set_rest_duration_in_seconds <= 0) {
      return t('Seconds', { count: 0 });
    }

    const milliseconds = moment
      .duration(set_rest_duration_in_seconds, 'seconds')
      .asMilliseconds();

    return moment.utc(milliseconds).format('mm:ss');
  }, [t, set_rest_duration_in_seconds]);

  const repMode = useMemo(() => {
    switch (rep_mode) {
      case RepMode.REPEATS:
        return <Repeats count={repeats} />;
      case RepMode.DISTANCE:
        return <Distance meters={distance_in_meters} />;
      case RepMode.TIME:
        return <Time seconds={time_in_seconds} />;
      default:
        return null;
    }
  }, [rep_mode, repeats, distance_in_meters, time_in_seconds]);

  const weightMode = useMemo(() => {
    switch (mode) {
      case WeightMode.BODY_WEIGHT:
        return <BodyWeight />;
      case WeightMode.BPM:
        return <BPM count={bpm} />;
      case WeightMode.RPE:
        return <RPE count={rpe} />;
      case WeightMode.SPEED:
        return <Speed percentage={speed_percentage} />;
      case WeightMode.TEMPO:
        return <Tempo seconds={tempo} />;
      case WeightMode.WEIGHT:
        return <Weight count={weight_in_kg} />;
      default:
        return null;
    }
  }, [mode, bpm, rpe, speed_percentage, tempo, weight_in_kg]);

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
          position="relative"
        >
          <Box>
            <Checkbox
              position={['absolute', 'static']}
              top={0}
              left={0}
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
          {repMode}
          <Box>
            <Text>{t('Rest')}</Text>
            <Badge colorScheme="blue" variant="solid">
              <Text>{restTimeText}</Text>
            </Badge>
          </Box>
          {weightMode}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
