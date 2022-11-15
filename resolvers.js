import client from "./client";
// import pubsub from "./pubsub";
// import { withFilter } from "graphql-subscriptions";

const NEW_MESSAGE = "NEW_MESSAGE";
const resolvers = {
    // Subscription: {
    //     roomUpdates: {
    //         subscribe: async (root, args, context, info) => {
    //             const room = await client.room.findFirst({
    //                 where: {
    //                     id: args.id,
    //                     users: { some: { id: context.loggedInUser.id } },
    //                 },
    //                 select: { id: true },
    //             });

    //             if (!room) {
    //                 throw new Error("You shall not see this.");
    //             }

    //             return withFilter(
    //                 () => pubsub.asyncIterator(NEW_MESSAGE), //trigger(string)들을 listen함
    //                 async ({ roomUpdates }, { id }, { loggedInUser }) => {
    //                     //굳이 해줄 필요는 없지만 user가 listen중에 대화방을 나갈경우를 대비해,..
    //                     if (roomUpdates.roomId === id) {
    //                         const room = await client.room.findFirst({
    //                             where: {
    //                                 id,
    //                                 users: {
    //                                     some: {
    //                                         id: loggedInUser.id,
    //                                     },
    //                                 },
    //                             },
    //                             select: {
    //                                 id: true,
    //                             },
    //                         });
    //                         if (!room) {
    //                             return false;
    //                         }
    //                         return true;
    //                     }
    //                 }
    //             )(root, args, context, info);
    //         },
    //     },
    // },

    Query: {
        seeRooms: async (_, __, { loggedInUser }) =>
            client.room.findMany({
                where: {
                    users: {
                        some: {
                            id: loggedInUser.id,
                        },
                    },
                },
            }),
        seeRoom: (_, { id }, { loggedInUser }) =>
            client.room.findFirst({
                where: {
                    id,
                    users: {
                        some: {
                            id: loggedInUser.id,
                        },
                    },
                },
            }),
    },
    Mutation: {
        saveUserInfo: async (_, { email, token }) => {
            const existingUser = await client.user.findFirst({
                where: {
                    email,
                },
            });

            if (!existingUser) {
                const isAdmin = email === "tpdud3254@gmail.com";
                const createdUser = await client.user.create({
                    data: {
                        email,
                        isAdmin,
                    },
                });

                if (createdUser.id) {
                    return {
                        ok: true,
                        id: createdUser.id,
                    };
                }
            }

            return {
                ok: true,
            };
        },
        sendMessage: async (
            _,
            { payload, roomId, userId },
            { loggedInUser, token }
        ) => {
            let room = null;
            if (userId) {
                //user check
                const user = await client.user.findUnique({
                    where: { id: userId },
                    select: { id: true },
                });

                if (!user) {
                    return {
                        ok: false,
                        error: "This user does not exists.",
                    };
                }

                //create room
                room = await client.room.create({
                    data: {
                        users: {
                            connect: [{ id: userId }, { id: loggedInUser.id }],
                        },
                    },
                });
            } else if (roomId) {
                //find room
                room = await client.room.findUnique({
                    where: {
                        id: roomId,
                    },
                    select: { id: true },
                });

                if (!room) {
                    return {
                        ok: false,
                        error: "Room not found",
                    };
                }
            }

            //create message
            const message = await client.message.create({
                data: {
                    payload,
                    room: {
                        connect: {
                            id: room.id,
                        },
                    },
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    },
                },
            });

            pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
            return {
                ok: true,
                id: message.id,
            };
        },
        readMessage: async (_, { id }, { loggedInUser }) => {
            /* 
                    1. 내가 그 대화방에 있고 
                    2. 내가 그 메세지를 보낸 사용자가 아닐 경우
                    3. 내가 그 메세지가 보내진 걸 알고있을 때 
                    메세지 읽음 표시를 할 수 있음
                */
            const message = await client.message.findFirst({
                where: {
                    id,
                    userId: {
                        not: loggedInUser.id,
                    },
                    room: {
                        users: {
                            some: {
                                id: loggedInUser.id,
                            },
                        },
                    },
                },
                select: {
                    id: true,
                },
            });

            if (!message) {
                return {
                    ok: false,
                    error: "Message not found.",
                };
            }

            await client.message.update({
                where: {
                    id,
                },
                data: {
                    read: true,
                },
            });

            return {
                ok: true,
            };
        },
    },

    Room: {
        users: ({ id }) => client.room.findUnique({ where: { id } }).users(), // 유저가 많아 질 경우에는 부적합한 방법이긴함
        messages: ({ id }) =>
            client.message.findMany({
                where: {
                    roomId: id,
                },
            }),
        //TODO: pagination 추가
        //위에 방법 둘다 똑같은데 밑에는 pagination을 할 수 있음
        unreadTotal: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return 0;
            }

            return client.message.count({
                where: {
                    read: false,
                    roomId: id,
                    user: {
                        id: {
                            not: loggedInUser.id,
                        },
                    },
                },
                //읽지 않고, 대화하는 방에, 내가 보낸 메세지가 아닌 경우에..
            });
        },
    },
    Message: {
        user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
        //TODO: 삭제기능도 구현할수있음
    },
};

export default resolvers;
