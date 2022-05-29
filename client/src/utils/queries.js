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

export const QUERY_DEVICE = gql`
  query device($deviceId: ID!) {
    device(deviceId: $deviceId) {
      name
      history {
        value
        timestamp
      }
    }
  }
`;

export const QUERY_FIRST_DEVICE = gql`
  query firstDevice {
    firstDevice {
      name
      history {
        timestamp
        value
      }
    }
  }
`;
