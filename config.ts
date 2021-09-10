const config = {
  providers: {
    hasura: {
      graphqlUrl: process.env.HASURA_GRAPHQL_URL,
    },
    backend: {
      baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
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
      public_folder: 'images/uploads',
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
