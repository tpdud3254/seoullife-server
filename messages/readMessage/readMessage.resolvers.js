import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        readMessage: async (_, { userId, roomId }) => {
            /* 
            1. 내가 그 대화방에 있고 
            2. 내가 그 메세지를 보낸 사용자가 아닐 경우
            3. 내가 그 메세지가 보내진 걸 알고있을 때 
            메세지 읽음 표시를 할 수 있음
        */
            const messages = await client.message.findMany({
                where: {
                    roomId: roomId,
                    userId: {
                        not: userId,
                    },
                },
                select: {
                    id: true,
                },
            });

            if (!messages) {
                return {
                    ok: false,
                    error: "Message not found.",
                };
            }

            messages.map(
                async (msg) =>
                    await client.message.update({
                        where: {
                            id: msg.id,
                        },
                        data: {
                            read: true,
                        },
                    })
            );

            return {
                ok: true,
            };
        },
    },
};
