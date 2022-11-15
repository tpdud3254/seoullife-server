import { gql } from "apollo-server";

export default gql`
    type Query {
        seeRoom(userId: Int!): Room
    }
`;
