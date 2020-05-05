import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        email
        church {
          id
          name
          intro
          uuid
          channelId
          slideImageOne
          slideImageTwo
          slideImageThree
        }
      }
      token
    }
  }
`;

export const CREATE_CHURCH = gql`
  mutation(
    $name: String!
    $intro: String!
    $channelId: String!
    $userId: String!
  ) {
    createChurch(
      name: $name
      intro: $intro
      channelId: $channelId
      userId: $userId
    ) {
      id
      name
      uuid
      channelId
      slideImageOne
      slideImageTwo
      slideImageThree
      user {
        email
        name
      }
      latestVideos {
        id
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      email
      name
      church {
        id
        name
        intro
        channelId
        slideImageOne
        slideImageTwo
        slideImageThree
        uuid
        latestVideos {
          videoId
        }
      }
    }
  }
`;

export const UPDATE_CHURCH = gql`
  mutation(
    $churchId: String!
    $name: String!
    $channelId: String!
    $intro: String!
  ) {
    updateChurch(
      churchId: $churchId
      name: $name
      channelId: $channelId
      intro: $intro
    ) {
      id
      name
      intro
      channelId
      slideImageOne
      slideImageTwo
      slideImageThree
      uuid
      latestVideos {
        videoId
      }
    }
  }
`;

export const GET_PRESIGNED_URL = gql`
  mutation($fileExtension: String, $contentType: String, $userId: String) {
    getPresignedUrl(
      fileExtension: $fileExtension
      contentType: $contentType
      userId: $userId
    ) {
      url
    }
  }
`;

export const DELETE_SLIDER_IMAGE = gql`
  mutation($userId: String, $sliderNumber: String) {
    deleteSlideImage(userId: $userId, sliderNumber: $sliderNumber) {
      name
      intro
      slideImageOne
      slideImageTwo
      slideImageThree
    }
  }
`;
