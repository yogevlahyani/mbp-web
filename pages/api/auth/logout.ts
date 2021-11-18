import { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import config from '../../../config';
import { RequestWithSession } from '../../../lib/session';

export default withIronSessionApiRoute(
  (req: RequestWithSession, res: NextApiResponse) => {
    req.session.destroy();

    res.redirect('/');
  },
  config.session,
);
