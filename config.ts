const config = {
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'local',
  isProduction: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
  providers: {
    hasura: {
      graphqlUrl: process.env.HASURA_GRAPHQL_URL,
    },
    oneSignal: {
      appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
      safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
      notifyButton: {
        enable: false,
        subdomainName: 'mybodypro.OS.TC',
      },
      autoResubscribe: true,
      allowLocalhostAsSecureOrigin: true,
    },
    netlifyCMS: {
      cms_manual_init: true,
      backend: {
        name: 'github',
        repo: 'yogevlahyani/mbp-web',
        branch: 'main',
      },
      publish_mode: 'editorial_workflow',
      media_folder: 'public/images/uploads',
      public_folder: 'images',
      collections: [
        {
          name: 'pages',
          label: 'Pages',
          files: [
            {
              label: 'Home',
              name: 'home',
              file: 'content/pages/home.md',
              fields: [
                {
                  label: 'Title',
                  name: 'title',
                  widget: 'string',
                },
                {
                  label: 'Description',
                  name: 'description',
                  widget: 'markdown',
                },
                {
                  label: 'Slider Images',
                  name: 'slider_images',
                  widget: 'list',
                  fields: [
                    {
                      label: 'Slide',
                      name: 'slider_item',
                      widget: 'object',
                      fields: [
                        { label: 'Title', name: 'title', widget: 'string' },
                        {
                          label: 'Description',
                          name: 'description',
                          widget: 'string',
                        },
                        { label: 'Image', name: 'image', widget: 'image' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

export default config;
