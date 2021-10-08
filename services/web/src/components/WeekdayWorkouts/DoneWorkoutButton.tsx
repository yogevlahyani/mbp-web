import React, { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { workoutStartTimeAtom } from './state';
import moment, { Moment } from 'moment';

interface Props {}

export const DoneWorkoutButton: React.FC<Props> = () => {
  const { t } = useTranslation('common');
  const [workoutEndTime, setWorkoutEndTime] = useState<Moment | null>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const workoutStartTime = useRecoilValue(workoutStartTimeAtom);
  const resetWorkoutStartTime = useResetRecoilState(workoutStartTimeAtom);
  const { push } = useRouter();

  const onSummaryClick = useCallback(() => {
    const endTime = moment();
    setWorkoutEndTime(endTime);
    onOpen();
  }, [setWorkoutEndTime, onOpen]);

  const onDoneClick = useCallback(() => {
    push('/');
    resetWorkoutStartTime();
    setWorkoutEndTime(null);
    onClose();
  }, [onClose, resetWorkoutStartTime, setWorkoutEndTime, push]);

  const duration = useMemo(() => {
    const diff = workoutEndTime?.diff(workoutStartTime);

    return moment.utc(diff).format('HH:mm:ss');
  }, [workoutStartTime, workoutEndTime]);

  if (!workoutStartTime) {
    return null;
  }

  return (
    <>
      <Center>
        <Button colorScheme="green" onClick={onSummaryClick} my={5} mx="auto">
          {t('Done')}
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="black">{t('Workout Summary')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="grey">
            <Box>
              <HStack justifyContent="space-between">
                <Text color="black">{t('Workout Duration')}</Text>
                <Text color="black">{duration}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="black">{t('Started At')}</Text>
                <Text color="black">{workoutStartTime.format('HH:mm:ss')}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="black">{t('Ended At')}</Text>
                <Text color="black">{workoutEndTime?.format('HH:mm:ss')}</Text>
              </HStack>
            </Box>
            {/* <Table size="sm" mt={10}>
              <Thead>
                <Tr>
                  <Th>{t('Top Trainers')}</Th>
                  <Th>{t('Workout Duration')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{t('Workout Duration')}</Th>
                  <Th>{t('Top Trainers')}</Th>
                </Tr>
              </Tfoot>
            </Table> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={onDoneClick}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
