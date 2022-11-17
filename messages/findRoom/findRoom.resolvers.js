import client from "../../client";

export default {
    Query: {
        findRoom: async (__, { id }) => {
            const room = await client.room.findFirst({
                where: {
                    users: {
                        some: {
                            id,
                        },
                    },
                },
            });

            return {
                roomId: room.id,
            };
        },
    },
};
