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
    workouts_by_pk(id: $workoutId) {
      id
      name
      description
      image
      workouts_exercises(order_by: { order: asc }) {
        order
        rest
        repeats
        sets
        weight_in_kg
        set_group
        mode
        rep_mode
        rpe
        set_rest_duration_in_seconds
        speed_percentage
        tempo
        time_in_seconds
        distance_in_meters
        notes
        max_repeats
        exercise {
          id
          name
          instructions
          image
          video
          exercises_muscles {
            muscle {
              display_name
              image
              name
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
          workouts_exercises(order_by: { set_group: asc }, distinct_on: set_group) {
            weight_in_kg
            sets
            rest
            repeats
            rep_mode
            mode
            alternative
            body_weight
            bpm
            distance_in_meters
            duration_in_seconds
            time_in_seconds
            tempo
            each_side
            rpe
            set_rest_duration_in_seconds
            set_group
            speed_percentage
            notes
            max_repeats
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
