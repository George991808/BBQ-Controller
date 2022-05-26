import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allProfiles {
    users {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleProfile($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;
