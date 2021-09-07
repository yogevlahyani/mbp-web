import { gql } from '@apollo/client';

export const GET_WEEK_WORKOUTS = gql`
  query GetWeekWorkouts($weekId: uuid!) {
    program_weeks_by_pk(id: $weekId) {
      program_week_workouts {
        workout {
          id
          name
          description
          image
        }
      }
    }
  }
`;

export const GET_WEEKLY_VIDEOS = gql`
  query GetUserProgramsWeeklyVideos($weekNumber: Int!) {
    program_week_videos(
      where: { program_week: { week_number: { _eq: $weekNumber } } }
    ) {
      id
      name
      url
      order
      user_videos_histories {
        id
        offset
        is_completed
      }
    }
  }
`;
