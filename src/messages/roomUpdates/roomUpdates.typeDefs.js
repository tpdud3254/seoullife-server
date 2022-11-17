import { gql } from "apollo-server";

export default gql`
    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }

    type Subscription {
        roomUpdates(roomId: Int!, userId: Int!): Message
    }
`;
