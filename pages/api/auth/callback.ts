import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.query;

  if (!access_token) {
    res.send('ERROR');
  }

  res.redirect('/');
}
