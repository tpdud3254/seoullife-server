"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _apolloServer = require("apollo-server");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    type User {\n        id: Int!\n        email: String!\n        isAdmin: Boolean!\n        createdAt: String!\n        updatedAt: String!\n    }\n    type Query {\n        users: String!\n    }\n"])));
exports["default"] = _default;