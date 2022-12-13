import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
{
    profile {
        username
        email
        _id
        password
        questions{
            questionId
            text
        }
    }
}`

export const GET_QUESTIONS = gql`
{
    questions {
        questionId
        text
    }
}`