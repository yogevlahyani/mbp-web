import { gql } from '@apollo/client';

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

export const GET_USER_PROGRAMS = gql`
  query GetUserPrograms {
    user_programs(order_by: { starts_at: asc }) {
      id
      program {
        id
        name
        description
        image
        author {
          picture
          name
          nickname
        }
        program_weeks {
          id
          week_number
          program_week_workouts {
            id
            day_of_the_week
          }
          program_week_videos {
            id
            name
            url
            order
          }
        }
      }
      starts_at
    }
  }
`;
