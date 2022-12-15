import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
{
  me {
    _id
    questions {
      _id
      text
    }
    username
  }

}`;

export const GET_QUESTIONS = gql`
{
    questions {
        text
        _id
    }
}`;