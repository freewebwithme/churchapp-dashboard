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
          addressLineOne
          addressLineTwo
          phoneNumber
          email
          schedules {
            serviceName
            serviceTime
            order
          }
          employees {
            name
            position
            profile_image
            order
          }
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
      intro
      uuid
      channelId
      addressLineOne
      addressLineTwo
      phoneNumber
      email
      schedules {
        serviceName
        serviceTime
        order
      }
      employees {
        name
        position
        profile_image
        order
      }
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
        uuid
        channelId
        addressLineOne
        addressLineTwo
        phoneNumber
        email
        schedules {
          serviceName
          serviceTime
          order
        }
        employees {
          name
          position
          profile_image
          order
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
    $addressLineOne: String
    $addressLineTwo: String
    $email: String
    $phoneNumber: String
  ) {
    updateChurch(
      churchId: $churchId
      name: $name
      channelId: $channelId
      intro: $intro
      addressLineOne: $addressLineOne
      addressLineTwo: $addressLineTwo
      email: $email
      phoneNumber: $phoneNumber
    ) {
      id
      name
      intro
      uuid
      channelId
      addressLineOne
      addressLineTwo
      phoneNumber
      email
      schedules {
        serviceName
        serviceTime
        order
      }
      employees {
        name
        position
        profileImage
        order
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

export const UPDATE_SERVICE_INFO = gql`
  mutation($churchId: String!, $schedules: String!) {
    updateServiceInfo(churchId: $churchId, schedules: $schedules) {
      id
      name
      intro
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
