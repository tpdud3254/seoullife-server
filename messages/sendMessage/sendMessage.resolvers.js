import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
    Mutation: {
        sendMessage: async (__, { payload, roomId, userId, isAdmin }) => {
            let room = null;
            let message = null;
            let userEmail = null;

            const adminUser = await client.user.findFirst({
                where: {
                    isAdmin: true,
                },
            });

            if (isAdmin) {
                userEmail = adminUser.email;
                if (roomId) {
                    room = await client.room.findUnique({
                        where: {
                            id: roomId,
                        },
                    });
                }

                if (!room) {
                    return {
                        ok: false,
                        error: "Room not found",
                    };
                }

                message = await client.message.create({
                    data: {
                        payload,
                        room: {
                            connect: {
                                id: room.id,
                            },
                        },
                        user: {
                            connect: { id: adminUser.id },
                        },
                    },
                });
            } else {
                const user = await client.user.findUnique({
                    where: {
                        id: userId,
                    },
                });

                if (user) {
                    userEmail = user.email;
                }

                room = await client.room.findFirst({
                    where: {
                        users: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                });

                if (!room) {
                    const newRoom = await client.room.create({
                        data: {
                            users: {
                                connect: [{ id: userId }, { id: adminUser.id }],
                            },
                        },
                    });

                    message = await client.message.create({
                        data: {
                            payload,
                            room: {
                                connect: {
                                    id: newRoom.id,
                                },
                            },
                            user: {
                                connect: { id: userId },
                            },
                        },
                    });
                } else {
                    message = await client.message.create({
                        data: {
                            payload,
                            room: {
                                connect: {
                                    id: room.id,
                                },
                            },
                            user: {
                                connect: { id: userId },
                            },
                        },
                    });
                }
            }

            if (message) {
                pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });

                return {
                    ok: true,
                    id: message.id,
                    userEmail,
                };
            }

            return {
                ok: false,
            };
        },
    },
};
