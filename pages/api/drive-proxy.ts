import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).end();
  }

  return httpProxyMiddleware(req, res, {
    target: `https://drive.google.com/file/d/${id}/preview`,
    changeOrigin: true,
    pathRewrite: {
      '^/api/drive-proxy': '',
    },
  });
}
