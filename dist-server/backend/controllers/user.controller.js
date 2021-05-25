"use strict";

var _UserSchema = _interopRequireDefault(require("../models/UserSchema.model"));

var _PostSchema = _interopRequireDefault(require("../models/PostSchema.model"));

var _UserRegister = _interopRequireDefault(require("../../client/src/components/UserRegister"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Create new user based on user input from front-end.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {int, string} {status, message}
 */
module.exports.register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, email, password, userExists, emailExists, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log(req.body);
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
            /* If any request body parameters were left out, return with error. */

            if (!(!username || !email || !password)) {
              _context.next = 5;
              break;
            }

            throw new Error("account credentials not satisfied");

          case 5:
            _context.next = 7;
            return _UserSchema.default.exists({
              username: username
            });

          case 7:
            userExists = _context.sent;
            _context.next = 10;
            return _UserSchema.default.exists({
              email: email
            });

          case 10:
            emailExists = _context.sent;

            if (!userExists) {
              _context.next = 15;
              break;
            }

            throw new Error("user ".concat(username, " already exists"));

          case 15:
            if (!emailExists) {
              _context.next = 17;
              break;
            }

            throw new Error("email ".concat(email, " already in use"));

          case 17:
            /* Finally create new user, saved into db, returns with success */
            user = new _UserSchema.default({
              username: username,
              email: email,
              password: password
            });
            console.log("user ".concat(username, " successfully created @ ").concat(req.connection.remoteAddress));
            _context.next = 21;
            return user.save();

          case 21:
            return _context.abrupt("return", res.status(200).send("user ".concat(username, " has been created")));

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(400).json({
              error: _context.t0.message
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.getSettings = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.headers.authorization) {
              _context2.next = 2;
              break;
            }

            throw new Error('no auth');

          case 2:
            user = res.locals.user;
            _context2.prev = 3;

            if (user) {
              _context2.next = 6;
              break;
            }

            throw new Error('user not found');

          case 6:
            return _context2.abrupt("return", res.status(201).json({
              user: user
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(401).send(_context2.t0));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.getForeignProfile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var username;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // if(!res.locals.user) res.status(302).redirect('/')
            username = req.params.username;
            console.log(req.params);
            _context3.prev = 2;
            _context3.next = 5;
            return _UserSchema.default.findOne({
              username: username
            }).populate('posts').exec(function (err, user) {
              if (!user) return res.status(404).send({
                error: 'user not found'
              });

              var _user$toObject = user.toObject(),
                  password = _user$toObject.password,
                  email = _user$toObject.email,
                  __v = _user$toObject.__v,
                  parsedUser = _objectWithoutProperties(_user$toObject, ["password", "email", "__v"]);

              return res.status(200).send(parsedUser);
            });

          case 5:
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(404).send(_context3.t0.message));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *  Searches database for requested username.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {int, string} {status, message}
 */


module.exports.userByUsername = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _UserSchema.default.findOne({
              username: req.params.username
            }, function (err, user) {
              if (user == null) {
                return res.status(404).send({
                  error: "".concat(req.params.username, " not found")
                });
              }

              var username = user.username,
                  _id = user._id,
                  created = user.created;
              return res.status(200).send({
                success: {
                  username: username,
                  _id: _id,
                  created: created
                }
              });
            });

          case 3:
            _context4.next = 8;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(400).send("".concat(_context4.t0)));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 5]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.userById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.username;
            _context5.prev = 1;
            _context5.next = 4;
            return _UserSchema.default.findById(id, function (err, user) {
              if (err) throw new Error("".concat(id, " not found"));
              return res.status(200).send({
                success: {
                  user: user
                }
              });
            });

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](1);
            return _context5.abrupt("return", res.status(400).send("".concat(_context5.t0)));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 6]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Gathers entire list of users and their id's from database, in creation order.
 * 
 * @param   {*} req 
 * @param   {*} res 
 * @param   {string} typeToPresent - TODO: ascending, descending
 * @returns {res.status, res.send} - 
 */


module.exports.userList = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var count, list;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            count = 0;
            _context6.prev = 1;
            _context6.next = 4;
            return _UserSchema.default.find({}, {
              _id: 1,
              username: 1,
              created: 1
            }, function (err, users) {
              // eslint-disable-next-line no-unused-vars
              for (var user in users) {
                count++;
              }
            });

          case 4:
            list = _context6.sent;

            if (!list) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(200).send({
              list: list
            }));

          case 9:
            return _context6.abrupt("return", res.status(404).send({
              error: "users not found"
            }));

          case 10:
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            return _context6.abrupt("return", res.status(400).send({
              error: "".concat(_context6.t0)
            }));

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports.delete = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (req.headers.authorization) {
              _context7.next = 2;
              break;
            }

            throw new Error('no auth');

          case 2:
            user = res.locals.user;
            console.log(user);
            _context7.prev = 4;

            if (user) {
              _context7.next = 7;
              break;
            }

            throw new Error('user not found');

          case 7:
            _context7.next = 9;
            return _UserSchema.default.deleteOne({
              _id: user._id
            }, function (err) {
              if (err) throw new Error('could not delete user');
            }).catch(function (err) {
              if (err) throw new Error('could not');
            });

          case 9:
            _context7.next = 11;
            return _PostSchema.default.deleteMany({
              author: user._id
            }, function (err) {
              if (err) throw new Error('could not delete posts');
            }).catch(function (err) {
              if (err) throw new Error('could not');
            });

          case 11:
            return _context7.abrupt("return", res.status(200).send({
              message: 'user deleted'
            }));

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](4);
            return _context7.abrupt("return", res.status(401).send(_context7.t0.message));

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[4, 14]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
/* export default { create, userByUsername, userList } */