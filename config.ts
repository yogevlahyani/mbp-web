const config = {
  origin: process.env.NEXT_PUBLIC_ORIGIN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'local',
  isProduction: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
  session: {
    cookieName: 'mybodypro',
    password: process.env.COOKIE_PASSWORD as string,
  },
  providers: {
    hasura: {
      graphqlUrl: process.env.HASURA_GRAPHQL_URL,
    },
    auth: {
      baseUrl: process.env.NEXT_PUBLIC_BASE_AUTH_URL,
    },
    logRocket: {
      appId: 'urfnar/mybodypro',
    },
    oneSignal: {
      appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
      safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
      subdomainName: 'mybodypro.OS.TC',
      notifyButton: {
        enable: false,
      },
      promptOptions: {
        slidedown: {
          prompts: [
            {
              type: 'push',
              autoPrompt: true,
              text: {
                /* limited to 90 characters */
                actionMessage: 'נשלח לך התראות לגבי זמני אימונים',
                /* acceptButton limited to 15 characters */
                acceptButton: 'אפשר',
                /* cancelButton limited to 15 characters */
                cancelButton: 'בטל',
              },
              delay: {
                pageViews: 1,
                timeDelay: 20,
              },
            },
          ],
        },
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
