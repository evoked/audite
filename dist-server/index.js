"use strict";

var _UserSchema = _interopRequireDefault(require("./backend/models/UserSchema.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import App from './App';
let express = require('express');

const app = express(); // let users = {
//     user1: {
//         test: "1"
//     },
//     user2: {
//         test: "2"
//     }
// }
// const userz = new UserSchema({ username: "evoked", email: "blah", created: Date.now, password: "sdawd"})

app.get('/', (req, res) => res.send(userz)); // app.post('/login', (req, res) => {
// })
// app.route('/api/users').get(users)

app.listen(3000, () => console.log('server running...')); // ReactDOM.render(
//   document.getElementById('root')
// );