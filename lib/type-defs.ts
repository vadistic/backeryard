import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Query {
    viewer: User!
  }

  type Mutation {
    updateName(name: String!): User!
  }
`
