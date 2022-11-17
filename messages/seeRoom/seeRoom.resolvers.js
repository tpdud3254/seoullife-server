import client from "../../client";

export default {
    Query: {
        seeRoom: (_, { id }) =>
            client.room.findFirst({
                where: {
                    id,
                },
            }),
    },
};
