"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = _interopRequireDefault(require("../../client"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  Query: {
    seeRoom: function seeRoom(_, _ref) {
      var id = _ref.id;
      return _client["default"].room.findFirst({
        where: {
          id: id
        }
      });
    }
  }
};
exports["default"] = _default;