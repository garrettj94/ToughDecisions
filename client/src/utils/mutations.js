import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        profile{
            _id
            username
        }
    }
}`

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        profile{
            _id
            username
        }
    }
}`

export const CREATE_QUESTION = gql`
mutation createQuestion($text: String!) {
    createQuestion(text: $text) {
        _id
        username
    }
}`

export const DELETE_QUESTION = gql`
mutation deleteQuestion($text: String!) {
    deleteQuestion(text: $text) {
        _id
        username
    }
}`