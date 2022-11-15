import { gql } from "apollo-server";

export default gql`
    type Subscription {
        roomUpdates(roomId: Int!, userId: Int!): Message
    }
`;
