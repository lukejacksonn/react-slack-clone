const server = require('server')
const fetch = require('node-fetch')
const Chatkit = require('pusher-chatkit-server')

const { get, post } = server.router
const { json, header } = server.reply

const cors = [
  ctx => header('Access-Control-Allow-Origin', '*'),
  ctx =>
    header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    ),
]

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:4e0b2f9a-8b62-4817-9c7c-d427529e1544',
  key:
    '9d5a8e65-1740-442b-88a5-e557791282bc:7S5eLEyhIUbGGCiIJE3qyBVG5Diw9Uo8T8No86OrMiw=',
})

const randomUser = () =>
  fetch('https://uinames.com/api/?region=england&ext')
    .then(res => res.json())
    .then(user => [
      user.email.split('@')[0],
      `${user.name} ${user.surname}`,
      user.photo,
    ])

server([
  ctx => header('Access-Control-Allow-Origin', '*'),
  ctx =>
    header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    ),
  get('/', async ctx => {
    const data = await randomUser()
    const user = await chatkit.createUser(...data)
    return data[0]
  }),
  get(ctx => status(404)),
])
