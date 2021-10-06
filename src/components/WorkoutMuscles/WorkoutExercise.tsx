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
  Collapse,
  Button,
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';
import NextImage from 'next/image';
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
  notes: string;
  max_repeats: boolean;
  each_side: boolean;
}

interface Props extends WorkoutExerciseType {}

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
  notes,
  max_repeats,
  each_side,
  exercise: { id, name, instructions, image, video },
}) => {
  const { t } = useTranslation('common');
  const [showInstructions, setShowInstructions] = React.useState<boolean>(false);
  const handleToggleInstructions = () => setShowInstructions(!showInstructions);

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
        return (
          <Repeats count={repeats} isMaxRepeats={max_repeats} eachSide={each_side} />
        );
      case RepMode.DISTANCE:
        return <Distance meters={distance_in_meters} />;
      case RepMode.TIME:
        return <Time seconds={time_in_seconds} />;
      default:
        return null;
    }
  }, [
    rep_mode,
    repeats,
    distance_in_meters,
    time_in_seconds,
    max_repeats,
    each_side,
  ]);

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

  const exerciseVideo = useMemo(() => {
    if (!video) {
      return;
    }

    if (video.startsWith('https://drive.google.com/')) {
      const driveVideoId = video
        .split('https://drive.google.com/file/d/')[1]
        .split('/view')[0];

      return (
        <Image
          src={`https://drive.google.com/uc?export=view&id=${driveVideoId} `}
          width="auto"
          height={['170px', '270px']}
          allow="autoplay"
          alt={name}
        />
      );
    }

    return (
      <WeeklyVideo
        hideDetails
        name={name}
        url={video}
        width="auto"
        height={['170px', '270px']}
        m="auto"
      />
    );
  }, [video, name]);

  return (
    <AccordionItem border="none">
      <Flex
        flexDirection={['column', 'row']}
        gridGap={1}
        position="sticky"
        top="68px"
        zIndex={9}
      >
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
            <Heading size="lg" textAlign="left" dir="ltr">
              {name}
            </Heading>
            <Text fontSize="lg">
              {max_repeats
                ? `${t('Max')} ${t('Repeats')}`
                : t('RepeatsCount', { count: Number(repeats) })}
              {each_side && ` X ${t('Each Side')}`}
            </Text>
            <Text fontSize="lg">{t('Sets Count', { count: sets })}</Text>
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
        {exerciseVideo && (
          <Flex
            my={5}
            gridGap={10}
            flexDirection={['column', 'row']}
            justifyContent="center"
          >
            {exerciseVideo}
          </Flex>
        )}
        <Flex
          gridGap={5}
          my={5}
          flexDirection={['column', 'row']}
          textAlign={['center', 'start']}
        >
          {repMode}
          <Flex flexDirection={['row', 'column']} justifyContent="space-between">
            <Text>{t('Sets')}</Text>
            <Box>
              <Text>{t('Sets Count', { count: sets })}</Text>
            </Box>
          </Flex>
          {weightMode}
          <Flex flexDirection={['row', 'column']} justifyContent="space-between">
            <Text>{t('Rest')}</Text>
            <Box>
              <Text>{restTimeText}</Text>
            </Box>
          </Flex>
        </Flex>
        {notes &&
          notes.split('\n').map((note: string, index: number) => (
            <Text key={`note-${index}`} fontSize="md" textAlign="center" my={3}>
              {note}
            </Text>
          ))}
        {instructions && (
          <Flex justifyContent="center" flexDirection="column">
            <Button size="sm" onClick={handleToggleInstructions} mx="auto" mt={10}>
              {showInstructions ? t('Hide') : t('Show')} {t('Instructions')}
            </Button>
            <Collapse startingHeight={20} in={showInstructions}>
              <Box my={10}>
                {instructions.split('\n').map((chunk: string, index: number) => (
                  <Text
                    key={`instructions-${index}`}
                    fontSize="md"
                    textAlign="center"
                    my={3}
                  >
                    {chunk}
                  </Text>
                ))}
              </Box>
            </Collapse>
          </Flex>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};
