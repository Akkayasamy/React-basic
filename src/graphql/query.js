import { gql } from "@apollo/client";

export const GET_USERS = gql`
query getUser {
  getUser {
    status
    errorMessage
    result {
      first_name
      email
    }
  }
}`;


export const GET_MANAGERS = gql`
  query GetAllManagers {
    getAllManagers {
      status
      errorMessage
      results {
        id
        name
      }
    }
  }
`;