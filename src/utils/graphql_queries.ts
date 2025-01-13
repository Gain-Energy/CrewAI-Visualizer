# Add these queries to your existing graphql_queries.ts file

export const GET_MARKETPLACE_ITEMS = gql`
  query GetMarketplaceItems {
    marketplace {
      items {
        id
        type
        name
        description
        author
        version
        downloads
        rating
        price
        tags
        image
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_MARKETPLACE_ITEM = gql`
  query GetMarketplaceItem($id: ID!) {
    marketplaceItem(id: $id) {
      id
      type
      name
      description
      author
      version
      downloads
      rating
      price
      tags
      image
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_MARKETPLACE_ITEM = gql`
  mutation CreateMarketplaceItem(
    $type: String!
    $name: String!
    $description: String!
    $author: String!
    $version: String!
    $price: Float
    $tags: [String!]
  ) {
    createMarketplaceItem(
      type: $type
      name: $name
      description: $description
      author: $author
      version: $version
      price: $price
      tags: $tags
    ) {
      id
      type
      name
      description
      author
      version
      price
      tags
    }
  }
`;

export const UPDATE_MARKETPLACE_ITEM = gql`
  mutation UpdateMarketplaceItem(
    $id: ID!
    $type: String
    $name: String
    $description: String
    $version: String
    $price: Float
    $tags: [String!]
  ) {
    updateMarketplaceItem(
      id: $id
      type: $type
      name: $name
      description: $description
      version: $version
      price: $price
      tags: $tags
    ) {
      id
      type
      name
      description
      version
      price
      tags
    }
  }
`;

export const DELETE_MARKETPLACE_ITEM = gql`
  mutation DeleteMarketplaceItem($id: ID!) {
    deleteMarketplaceItem(id: $id) {
      success
      message
    }
  }
`;