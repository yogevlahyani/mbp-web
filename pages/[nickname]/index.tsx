import React from 'react';
import { Container } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import moment from 'moment';
import { UserRepresentation } from '../../src/components/UserRepresentation/UserRepresentation';
import { UserPrograms } from '../../src/components/UserPrograms/UserPrograms';
import { ProgramWeeks } from '../../src/components/ProgramWeeks/ProgramWeeks';
import { withPageAuthRequired } from '../../src/hoc/withPageAuthRequired';
import { getSession } from '../../lib/session';

export default function UserDashboard() {
  return (
    <Container maxWidth="container.xl" py={10}>
      <UserRepresentation />
      <UserPrograms my={[10, 20]} />
      <ProgramWeeks my={[10, 20]} />
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  getServerSideProps: async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx.req, ctx.res);

    // TODO: Show Public Profile
    if (session?.user.nickname !== ctx.params?.nickname) {
      return {
        redirect: {
          statusCode: 302,
          destination: `/${session?.user.nickname}`,
        },
      };
    }

    return {
      props: {},
    };
  },
});
