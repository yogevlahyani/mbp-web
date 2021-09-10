import React from 'react';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { WeekdayWorkouts } from '../../../../src/components/WeekdayWorkouts/WeekdayWorkouts';

export default function Week() {
  const { query } = useRouter();
  const { weekId, weekday } = query;

  return (
    <Container maxWidth="container.xl" py={10}>
      <WeekdayWorkouts weekId={String(weekId)} weekday={Number(weekday)} />
    </Container>
  );
}
