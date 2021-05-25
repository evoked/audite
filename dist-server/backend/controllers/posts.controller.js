"use strict";

var _UserSchema = _interopRequireDefault(require("../models/UserSchema.model"));

var _PostSchema = _interopRequireDefault(require("../models/PostSchema.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports.create = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, _req$body, url, body, post;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = res.locals.user;
            _req$body = req.body, url = _req$body.url, body = _req$body.body;
            _context.prev = 2;

            if (url) {
              _context.next = 5;
              break;
            }

            throw new Error('you must include a url');

          case 5:
            post = new _PostSchema.default({
              author: user._id,
              video_url: url,
              text_body: body,
              posted: Date.now()
            });
            _context.next = 8;
            return _UserSchema.default.findByIdAndUpdate(user._id).exec(function (err, user) {
              user.posts.push(post);
              user.save();
            });

          case 8:
            _context.next = 10;
            return post.save(function (err, post) {
              if (err) throw new Error('post could not be saved');
              return res.status(201).send("".concat(post.video_url, " has been saved"));
            });

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(401).send(_context.t0));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.remove = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();