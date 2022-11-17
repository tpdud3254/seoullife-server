import { gql } from "apollo-server";

export default gql`
    type Mutation {
        readMessage(userId: Int!, roomId: Int!): MutationResponse!
    }
`;
