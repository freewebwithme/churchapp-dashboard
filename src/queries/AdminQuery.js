import gql from "graphql-tag";
// For Admin
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

// For Admin
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
        hasKey

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

// For Admin
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
