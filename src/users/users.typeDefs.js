import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        email: String!
        isAdmin: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        users: String!
    }
`;
