import { gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        seeProfile(email: String!): User
        seeRooms: [Room]
        seeRoom(id: Int!): Room
    }

    type Mutation {
        saveUserInfo(email: String!, token: String): ResponseData!
        sendMessage(payload: String!, roomId: Int, userId: Int): ResponseData!
        readMessage(id: Int!): ResponseData!
    }

    type Subscription {
        roomUpdates(id: Int!): Message
    }

    type User {
        id: Int!
        email: String!
        createdAt: String!
        updatedAt: String!
        isAdmin: Boolean!
    }

    type Message {
        id: Int!
        payload: String!
        user: User!
        room: Room!
        read: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type Room {
        id: Int!
        users: [User]
        messages: [Message]
        createdAt: String!
        updatedAt: String!
        unreadTotal: Int!
    }

    type ResponseData {
        ok: Boolean!
        error: String
        id: Int
    }
`;

export default typeDefs;
