"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _apolloServer = require("apollo-server");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    type LoginResult {\n        ok: Boolean!\n        userId: Int!\n        isAdmin: Boolean!\n        error: String\n    }\n\n    type Mutation {\n        login(email: String!): LoginResult!\n    }\n"])));
exports["default"] = _default;