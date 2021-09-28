import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, handleLogout } from '@auth0/nextjs-auth0';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import configuration from '../../config';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

type Headers = { [header: string]: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  const isTokenExpired =
    !session?.accessTokenExpiresAt ||
    session?.accessTokenExpiresAt <= Date.now() / 1000;

  if (isTokenExpired) {
    handleLogout(req, res);
    return;
  }

  console.log('session', session);
  console.log('isTokenExpired', isTokenExpired);

  if (isTokenExpired) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const headers: Headers = {
    'x-hasura-role': 'public',
  };

  if (session.accessToken) {
    headers['x-hasura-role'] = 'user';
    headers.authorization = `Bearer ${session.accessToken}`;
  }

  return httpProxyMiddleware(req, res, {
    target: configuration.providers.hasura.graphqlUrl,
    changeOrigin: true,
    headers,
    pathRewrite: {
      '^/api/graphql': '',
    },
  });
}
