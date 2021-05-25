"use strict";

var _UserSchema = _interopRequireDefault(require("../models/UserSchema.model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * zzz
 * @param {*} req 
 * @param {*} res 
 * @returns {token, message} returns JWT token
 */
module.exports.login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, password;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const { authorization } = req.headers
            // if(!auth) return res.status(401).send({ error: `not authorized` })#
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context.prev = 1;

            if (!(!username || !password)) {
              _context.next = 4;
              break;
            }

            throw new Error('account details not satisfied');

          case 4:
            console.log("hi");
            _context.next = 7;
            return _UserSchema.default.find({
              username: username,
              password: password
            })
            /* If successfully found a user with credentials then go forward to .then statement */
            .
            /* If successfully found a user with credentials then go forward to .then statement */
            then(function (user) {
              console.log('hi' + user);
              /* Creating the token using JWT sign, converting the user's ID into a base64 encrypted string 
                  using the access token generated */

              /* Creating the token using JWT sign, converting the user's ID into a base64 encrypted string 
                  using the access token generated */
              var token = _jsonwebtoken.default.sign({
                data: user[0]._id
              }, process.env.ACCESS_TOKEN_SECRET);
              /* ???????????????????????? VVVVVVVVVVVVVV */


              /* ???????????????????????? VVVVVVVVVVVVVV */
              console.log(token + 'hello');

              if (!token) {
                throw new Error('invalid auth');
              }

              req.session.authorization = "Bearer ".concat(token);
              console.log("".concat(username, " has logged in @ ").concat(req.connection.remoteAddress));
              res.status(201).send({
                token: token,
                success: "successfully logged in as '".concat(user[0].username, "'")
              });
              return;
            }).catch(function (e) {
              console.log(e);
              if (e) throw new Error('user not found');
            });

          case 7:
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(401).json(_context.t0.message));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.authenticateToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var auth, token, _jwt$verify, data;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            auth = req.headers.authorization;

            if (auth) {
              _context2.next = 4;
              break;
            }

            throw new Error('no auth header');

          case 4:
            token = auth.split(' ')[1];
            /* If token is non-existant or has mistakenly been put into localStorage, then return error */

            if (!(token === "null" || token.length < 5)) {
              _context2.next = 7;
              break;
            }

            throw new Error('no auth');

          case 7:
            /* Process JWT verification using token passed by user, 
                will parse an error if the token is not valid */
            _jwt$verify = _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET), data = _jwt$verify.data;
            _context2.next = 10;
            return _UserSchema.default.findById(data).exec(function (err, user) {
              if (!user || err) throw new Error('user not found, token invalid');
              /* Parsing user as a new object, because 'user' is a mongoose document, and cannot have any
                  properties dropped as a result. Allowing to drop password into seperate variable */

              /* Parsing user as a new object, because 'user' is a mongoose document, and cannot have any
                  properties dropped as a result. Allowing to drop password into seperate variable */
              var _user$toObject = user.toObject(),
                  password = _user$toObject.password,
                  __v = _user$toObject.__v,
                  parsedUser = _objectWithoutProperties(_user$toObject, ["password", "__v"]); // console.log(parsedUser)

              /* Setting locals to parsedUser, to be used in the next server-side service */


              // console.log(parsedUser)

              /* Setting locals to parsedUser, to be used in the next server-side service */
              res.locals.user = parsedUser;
              /* Directing to next middleware/service/controller */

              /* Directing to next middleware/service/controller */
              return next();
            });

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.log('error', _context2.t0);
            return _context2.abrupt("return", res.status(400).send(_context2.t0));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.logout = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              // console.log(`${res.locals} ${req.session.authorization}`)
              // if (!req.session.authorization || !req.headers.authorization) throw (new Error('you are not logged in'))

              /* Setting everything to null so user auth is no longer feasible until next logged in */
              console.log(req.session.authorization, req.session.headers);
              res.locals.user = null;
              req.headers.authorization = null;
              req.session.authorization = null;
              res.status(200).json({
                message: 'you are now logging out'
              });
            } catch (e) {
              res.status(401).json(e);
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();