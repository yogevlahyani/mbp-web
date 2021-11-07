import { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import config from '../../../config';
import { RequestWithSession } from '../../../lib/session';

export default withIronSessionApiRoute(async function (
  req: RequestWithSession,
  res: NextApiResponse,
) {
  await req.session.destroy();

  res.redirect('/');
},
config.session);
