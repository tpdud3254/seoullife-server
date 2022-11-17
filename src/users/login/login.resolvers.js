import client from "../../client";

export default {
    Mutation: {
        login: async (__, { email }) => {
            const user = await client.user.findFirst({ where: { email } });

            const isAdmin = email === process.env.ADMIN;
            if (!user) {
                const newUser = await client.user.create({
                    data: {
                        email,
                        isAdmin,
                    },
                });

                return {
                    ok: true,
                    userId: newUser.id,
                    isAdmin,
                };
            } else {
                return {
                    ok: true,
                    userId: user.id,
                    isAdmin,
                };
            }
        },
    },
};
