import { gql } from "apollo-server";

export default gql`
    type LoginResult {
        ok: Boolean!
        userId: Int!
        isAdmin: Boolean!
        error: String
    }

    type Mutation {
        login(email: String!): LoginResult!
    }
`;
