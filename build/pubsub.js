"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _graphqlSubscriptions = require("graphql-subscriptions");
var _graphqlGooglePubsub = require("@axelspringer/graphql-google-pubsub");
var serviceAccount = require("./credentials.json");
// const pubsub = new PubSub();

var options = {
  projectId: serviceAccount["project_id"],
  credentials: {
    client_email: serviceAccount["client_email"],
    private_key: serviceAccount["private_key"]
  }
};
var commonMessageHandler = function commonMessageHandler(payload) {
  var dataBuffer = payload.data || "{}";
  return JSON.parse(dataBuffer);
};
var topic2SubName = function topic2SubName(topicName) {
  return "projects/".concat(serviceAccount["project_id"], "/subscriptions/").concat(topicName);
};
var pubsub = new _graphqlGooglePubsub.GooglePubSub(options, topic2SubName, commonMessageHandler);
var _default = pubsub;
exports["default"] = _default;