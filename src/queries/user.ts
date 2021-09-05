import { gql } from '@apollo/client'

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
`

export const GET_USER_PROGRAMS = gql`
  query GetUserPrograms {
    user_programs {
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
    }
  }
`

export const GET_USER_WEEKLY_VIDEOS = gql`
  query GetUserProgramsWeeklyVideos($weekNumber: Int!) {
    program_week_videos(
      where: { program_week: { week_number: { _eq: $weekNumber } } }
    ) {
      id
      name
      url
      order
      program_week {
        week_number
        program {
          id
          name
        }
      }
      user_videos_histories {
        id
        last_seconds_stamp
        is_completed
      }
    }
  }
`
