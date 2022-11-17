"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _apolloServer = require("apollo-server");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    type Message {\n        id: Int!\n        payload: String!\n        user: User!\n        room: Room!\n        read: Boolean!\n        createdAt: String!\n        updatedAt: String!\n    }\n\n    type Room {\n        id: Int!\n        users: [User]\n        messages: [Message]\n        createdAt: String!\n        updatedAt: String!\n        unreadTotal: Int!\n    }\n"])));
/*
seeRoom
seeRooms
sendMessage
readMessage
roomUpdates
*/
exports["default"] = _default;