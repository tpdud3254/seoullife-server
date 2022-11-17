import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, args, context, info) => {
                const room = await client.room.findFirst({
                    where: {
                        id: args.roomId,
                        users: { some: { id: args.userId } },
                    },
                    select: { id: true },
                });

                if (!room) {
                    throw new Error("You shall not see this.");
                }

                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async ({ roomUpdates }, { roomId, userId }) => {
                        if (roomUpdates.roomId === roomId) {
                            const room = await client.room.findFirst({
                                where: {
                                    id: roomId,
                                    users: {
                                        some: {
                                            id: userId,
                                        },
                                    },
                                },
                                select: {
                                    id: true,
                                },
                            });
                            if (!room) {
                                return false;
                            }
                            return true;
                        }
                    }
                )(root, args, context, info);
            },
        },
    },
};

/*
filter
1. 내가 리스닝하고 있는 roomID에 해당하는 메세지만 보여야함
2. room의 존재 여부
3. user가 대화방의 참여자가 맞는지 (user가 해당 room을 리스닝할수 있는 사람인지)
*/
