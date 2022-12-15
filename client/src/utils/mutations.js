import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}`;

export const CREATE_QUESTION = gql`
mutation createQuestion($text: String!) {
    createQuestion(text: $text) {
        _id
        username
    }
}`;

export const DELETE_QUESTION = gql`
mutation deleteQuestion($text: String!) {
    deleteQuestion(text: $text) {
        _id
        username
    }
}`;