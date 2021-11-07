import { gql } from '@apollo/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getApolloClient } from '../../../lib/apollo.client';
import { getSession } from '../../../lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  console.log('session', session);

  if (!session.user) {
    const client = getApolloClient({ token: session.token });

    const { data, error } = await client.query({
      query: gql`
        query getCurrentUser {
          currentUser {
            id
            name
            nickname
            picture
          }
        }
      `,
      errorPolicy: 'all',
    });

    if (error || !data?.currentUser) {
      return res.status(401).end();
    }

    session.user = data.currentUser;

    await req.session.save();
  }

  return res.status(200).json(session.user);
}
