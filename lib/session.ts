import { NextApiRequest, NextApiResponse } from 'next';
import { getIronSession, IronSession } from 'iron-session';
import config from '../config';

export type Session = IronSession & { [key: string]: any };

export interface RequestWithSession extends NextApiRequest {
  session: Session;
}

export const getSession = (
  req: RequestWithSession,
  res: NextApiResponse,
): Promise<Session> => getIronSession(req, res, config.session);
