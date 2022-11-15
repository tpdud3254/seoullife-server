import client from "../../client";

export default {
    Query: {
        seeRoom: (_, { userId }) =>
            client.room.findFirst({
                where: {
                    id,
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
            }),
    },
};
