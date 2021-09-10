import { gql } from '@apollo/client';

export const GET_WEEK_WORKOUTS = gql`
  query GetWeekWorkouts($weekId: uuid!) {
    program_weeks_by_pk(id: $weekId) {
      week_number
      program_week_workouts {
        workout {
          id
          name
          description
          image
          workouts_exercises(order_by: { order: asc_nulls_first }) {
            kg
            sets
            repeats
            rest
            order
            exercise {
              id
              name
              image
              video
              instructions
              exercises_muscles {
                muscle {
                  name
                  display_name
                  image
                }
              }
            }
          }
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

export const GET_WEEKDAY_WORKOUTS = gql`
  query GetWeekdayWorkouts($weekId: uuid!, $weekday: smallint!) {
    program_weeks_by_pk(id: $weekId) {
      week_number
      program_week_workouts(where: { day_of_the_week: { _eq: $weekday } }) {
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

export const GET_WORKOUT = gql`
  query GetWorkout($workoutId: uuid!) {
    muscles(
      where: {
        excercises_muscles: {
          exercise: { workouts_exercises: { workout: { id: { _eq: $workoutId } } } }
        }
      }
      order_by: { display_name: asc }
    ) {
      display_name
      image
      name
      excercises_muscles {
        exercise {
          workouts_exercises(order_by: { order: asc_nulls_first }) {
            order
            rest
            repeats
            sets
            kg
            exercise {
              id
              name
              instructions
              image
              video
            }
          }
        }
      }
    }
  }
`;

export const GET_WEEKDAY_WORKOUT_WITH_EXERCISES = gql`
  query GetWeekdayWorkouts($weekId: uuid!, $weekday: smallint!) {
    program_weeks_by_pk(id: $weekId) {
      week_number
      program_week_workouts(where: { day_of_the_week: { _eq: $weekday } }) {
        workout {
          id
          name
          description
          image
          workouts_exercises(order_by: { order: asc_nulls_first }) {
            kg
            sets
            rest
            repeats
            exercise {
              name
              exercises_muscles {
                muscle {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
