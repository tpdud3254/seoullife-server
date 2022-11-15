import client from "../../client";

export default {
    Query: {
        seeRooms: async () => {
            const adminUser = await client.user.findFirst({
                where: {
                    isAdmin: true,
                },
            });

            return client.room.findMany({
                where: {
                    users: {
                        some: {
                            id: adminUser.id,
                        },
                    },
                },
            });
        },
    },
};
