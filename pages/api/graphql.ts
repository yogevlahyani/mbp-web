import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import httpProxyMiddleware from 'next-http-proxy-middleware'
import configuration from '../../config'

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res)

  return httpProxyMiddleware(req, res, {
    target: configuration.providers.hasura.graphqlUrl,
    changeOrigin: true,
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
      'x-hasura-role': 'user',
    },
    pathRewrite: {
      '^/api/graphql': '',
    },
  })
}
