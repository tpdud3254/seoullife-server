import { gql } from "apollo-server";

export default gql`
    type findRoomResponse {
        roomId: Int
    }
    type Query {
        findRoom(id: Int!): findRoomResponse!
    }
`;
