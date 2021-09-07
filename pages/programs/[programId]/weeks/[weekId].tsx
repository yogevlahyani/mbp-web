import React from 'react';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ProgramWorkouts } from '../../../../src/components/ProgramWorkouts/ProgramWorkouts';

export default function Week() {
  const { query } = useRouter();
  const { weekId } = query;

  return (
    <Container maxWidth="container.xl" py={10}>
      <ProgramWorkouts weekId={String(weekId)} />
    </Container>
  );
}
