import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        email
        phoneNumber
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
          website
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
        phoneNumber
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
          website
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

export const CHANGE_PASSWORD = gql`
  mutation($email: String!, $currentPassword: String!, $newPassword: String!) {
    changePassword(
      email: $email
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      name
      email
      phoneNumber
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
    $website: String
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
      website: $website
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
        phoneNumber
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
      phoneNumber
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
        website
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

export const UPDATE_ME = gql`
  mutation(
    $userId: String!
    $email: String!
    $name: String!
    $phoneNumber: String
  ) {
    updateMe(
      userId: $userId
      email: $email
      name: $name
      phoneNumber: $phoneNumber
    ) {
      name
      email
      phoneNumber
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
    $website: String
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
      website: $website
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

export const REFETCH_VIDEOS = gql`
  mutation($userId: String!, $churchId: String!) {
    refetchLatestVideos(userId: $userId, churchId: $churchId) {
      id
      title
      description
    }
  }
`;

export const LIST_ALL_USERS = gql`
  {
    listUsers {
      id
      email
      phoneNumber
      name
      admin
    }
  }
`;

export const GET_USER = gql`
  query($Id: String!) {
    getUser(Id: $Id) {
      id
      email
      name
      phoneNumber
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
        website

        googleApiKey
        stripeSecretKey
        stripePublishableKey
        onesignalAppId
        onesignalApiKey
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

export const UPDATE_KEY_INFO = gql`
  mutation(
    $churchId: String!
    $googleApiKey: String!
    $stripeSecretKey: String!
    $stripePublishableKey: String!
    $onesignalAppId: String!
    $onesignalApiKey: String!
  ) {
    updateKeyInfo(
      churchId: $churchId
      googleApiKey: $googleApiKey
      stripeSecretKey: $stripeSecretKey
      stripePublishableKey: $stripePublishableKey
      onesignalAppId: $onesignalAppId
      onesignalApiKey: $onesignalApiKey
    ) {
      name
      intro
    }
  }
`;

export const SEND_PUSH = gql`
  mutation($churchId: String, $title: String, $message: String) {
    sendPush(churchId: $churchId, title: $title, message: $message) {
      id
      recipients
    }
  }
`;
