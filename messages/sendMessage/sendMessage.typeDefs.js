import { gql } from "apollo-server";

export default gql`
    type SendMessageResponse {
        ok: Boolean!
        id: Int
        error: String
        userEmail: String!
    }

    type Mutation {
        sendMessage(
            payload: String!
            roomId: Int
            userId: Int
            isAdmin: Boolean!
        ): SendMessageResponse!
    }
`;
