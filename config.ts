const config = {
  providers: {
    hasura: {
      graphqlUrl: process.env.HASURA_GRAPHQL_URL,
    },
    backend: {
      baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    },
  },
};

export default config;
