import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
{
    profile {
        username
        email
        _id
        password
        createdQuestions{
            _id
            text
        }
    }
}`

export const GET_QUESTIONS = gql`
{
    questions {
        text
        _id
    }
}`