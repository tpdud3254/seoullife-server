import { PubSub } from "graphql-subscriptions";
import { GooglePubSub } from "@axelspringer/graphql-google-pubsub";
const serviceAccount = require("./credentials.json");
// const pubsub = new PubSub();

const options = {
    projectId: serviceAccount["project_id"],
    credentials: {
        client_email: serviceAccount["client_email"],
        private_key: serviceAccount["private_key"],
    },
};

const commonMessageHandler = (payload) => {
    const dataBuffer = payload.data || "{}";
    return JSON.parse(dataBuffer);
};

const topic2SubName = (topicName) =>
    `projects/${serviceAccount["project_id"]}/subscriptions/${topicName}`;

const pubsub = new GooglePubSub(options, topic2SubName, commonMessageHandler);

export default pubsub;
