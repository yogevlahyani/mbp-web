import { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import config from '../../../config';
import { RequestWithSession } from '../../../lib/session';
import axios from 'axios';

export default withIronSessionApiRoute(
  async (req: RequestWithSession, res: NextApiResponse) => {
    const { email, firstName, lastName, nickname, password } = req.body;

    const { data } = await axios.post(
      `${config.providers.auth.baseUrl}/auth/register`,
      { email, firstName, lastName, nickname, password },
    );

    return res.status(200).json(data);
  },
  config.session,
);
