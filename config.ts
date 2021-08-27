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
        name: "github",
        repo: "yogevlahyani/mbp-web",
        branch: "main",
      },
      media_folder: "public/images/uploads",
      public_folder: "images",
      collections: [
        {
          name: "pages",
          label: "Pages",
          files: [
            {
              label: "Home",
              name: "home",
              file: "content/pages/home.md",
              fields: [
                {
                  label: "Hero Title",
                  name: "hero_title",
                  widget: "string",
                },
                {
                  label: "Hero Description",
                  name: "hero_description",
                  widget: "markdown",
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
