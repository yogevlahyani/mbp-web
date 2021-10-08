import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
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

  const headers: Headers = {
    'x-hasura-role': 'public',
  };

  if (session?.accessToken) {
    headers['x-hasura-role'] = 'user';
    headers.authorization = `Bearer ${session?.accessToken}`;
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
