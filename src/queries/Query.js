import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        email
        admin
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
            id
            name
            position
            profileImage
            order
            churchId
          }
          latestVideos {
            id
            title
            description
            videoId
            thumbnailUrl
            publishedAt
            channelTitle
          }
          news {
            id
            content
            createdAt
          }
        }
      }
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation(
    $email: String!
    $password: String!
    $name: String!
    $recaptchaValue: String!
  ) {
    signUp(
      email: $email
      password: $password
      name: $name
      recaptchaValue: $recaptchaValue
    ) {
      user {
        id
        name
        email
        admin
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
            id
            name
            position
            profileImage
            order
            churchId
          }
          latestVideos {
            id
            title
            description
            videoId
            thumbnailUrl
            publishedAt
            channelTitle
          }
          news {
            id
            content
            createdAt
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
    $addressLineOne: String
    $addressLineTwo: String
    $email: String
    $phoneNumber: String
  ) {
    createChurch(
      name: $name
      intro: $intro
      channelId: $channelId
      userId: $userId
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
        id
        name
        position
        profileImage
        order
        churchId
      }
      latestVideos {
        id
        title
        description
        videoId
        thumbnailUrl
        publishedAt
        channelTitle
      }
      user {
        email
        name
        admin
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
      admin
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
          id
          name
          position
          profileImage
          order
          churchId
        }
        news {
          id
          content
          createdAt
        }
        latestVideos {
          id
          title
          description
          videoId
          thumbnailUrl
          publishedAt
          channelTitle
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
        id
        name
        position
        profileImage
        order
        churchId
      }
      news {
        id
        content
        createdAt
      }
      latestVideos {
        id
        title
        description
        videoId
        thumbnailUrl
        publishedAt
        channelTitle
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation(
    $name: String!
    $position: String!
    $profileImage: String
    $churchId: String!
    $order: Integer!
  ) {
    createEmployee(
      name: $name
      position: $position
      profileImage: $profileImage
      churchId: $churchId
      order: $order
    ) {
      id
      name
      position
      profileImage
      order
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation(
    $id: ID!
    $name: String!
    $position: String!
    $profileImage: String
    $churchId: String!
    $order: Integer!
  ) {
    updateEmployee(
      id: $id
      name: $name
      position: $position
      profileImage: $profileImage
      churchId: $churchId
      order: $order
    ) {
      id
      name
      position
      profileImage
      order
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation($id: ID!, $churchId: String!) {
    deleteEmployee(id: $id, churchId: $churchId) {
      name
      position
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

export const CREATE_NEWS = gql`
  mutation($churchId: String!, $content: String!) {
    createNews(churchId: $churchId, content: $content) {
      id
      churchId
      content
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation($id: ID!, $churchId: String!, $content: String!) {
    updateNews(id: $id, churchId: $churchId, content: $content) {
      id
      churchId
      content
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation($id: ID!, $churchId: String!) {
    deleteNews(id: $id, churchId: $churchId) {
      id
      churchId
      content
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

export const REFETCH_VIDEOS = gql`
  mutation($userId: String!, $churchId: String!) {
    refetchLatestVideos(userId: $userId, churchId: $churchId) {
      id
      title
      description
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
