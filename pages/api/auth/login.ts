import { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import config from '../../../config';
import { RequestWithSession } from '../../../lib/session';
import axios from 'axios';

export default withIronSessionApiRoute(
  async (req: RequestWithSession, res: NextApiResponse) => {
    const { username, password } = req.body;

    const { data } = await axios.post(
      `${config.providers.auth.baseUrl}/auth/login`,
      { username, password },
    );

    return res.status(200).json(data);
  },
  config.session,
);
