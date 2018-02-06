const server = require('server')
const fetch = require('node-fetch')
const Chatkit = require('pusher-chatkit-server')
const credentials = require('./credentials.json')

const { get, post } = server.router
const { json, header, status } = server.reply

const chatkit = new Chatkit.default(credentials)

const listRooms = () =>
  chatkit
    .apiRequest({
      method: 'GET',
      path: '/rooms',
      jwt: chatkit.generateAccessToken({ userId: 'admin' }).token,
    })
    .then(response => JSON.parse(response.body))
    .catch(console.log)

const createRoom = name => chatkit.createRoom('admin', { name })

const randomUser = () =>
  fetch('https://uinames.com/api/?region=england&ext')
    .then(res => res.json())
    .then(user => [
      user.email.split('@')[0],
      `${user.name} ${user.surname}`,
      user.photo,
    ])

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
}

// createRoom('testing').then(room => {
//   listRooms().then(console.log)
// })

server({ port: process.env.PORT || 3000 }, [
  ctx => header(cors),
  get('/', async ctx => {
    try {
      const data = await randomUser()
      const user = await chatkit.createUser(...data)
      return data[0]
    } catch (e) {
      console.log(e)
    }
  }),
  get(ctx => status(404)),
])
