import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { getSession } from '../../lib/session';
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

  const headers: Headers = {
    'x-hasura-role': 'public',
  };

  if (session?.token) {
    headers['x-hasura-role'] = 'user';
    headers.authorization = `Bearer ${session?.token}`;
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
