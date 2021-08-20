import { gql } from "@apollo/client";

export const GET_USER_POINTS = gql`
  query GetUserPoints {
    userPointsAggregate {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;
