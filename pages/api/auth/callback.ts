import { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { gql } from '@apollo/client';
import { getApolloClient } from '../../../lib/apollo.client';
import config from '../../../config';
import { RequestWithSession } from '../../../lib/session';

export default withIronSessionApiRoute(async function (
  req: RequestWithSession,
  res: NextApiResponse,
) {
  const { access_token } = req.query;
  if (!access_token) {
    res.redirect('/sign-in');

    return;
  }

  console.log('access_token', access_token);

  const client = getApolloClient({ token: access_token.toString() });

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
    res.redirect('/sign-in');

    return;
  }

  req.session.token = access_token;
  req.session.user = data.currentUser;

  await req.session.save();

  res.redirect('/');
},
config.session);
