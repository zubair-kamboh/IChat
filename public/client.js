import { listMyself, listUsers, chatAreaHtml } from './utils.js'

const onlineUsers = document.querySelector('.online-users')
const yourself = document.querySelector('.search')
const chat = document.querySelector('.chat')
const chatIcon = document.querySelector('.chat-icon')
const chatArea = document.querySelector('.chat-area')
const homeButton = document.querySelector('.home-button')

const socket = io()
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const username = urlParams.get('name')
socket.auth = { username }

homeButton.addEventListener('click', () => (location.href = '/'))

// send user
socket.emit('user', username)

// recieve users info
socket.on('users', (users) => {
  const others = users.filter((user) => user.id !== socket.id)
  const me = users.find((user) => user.id === socket.id)

  // map others
  onlineUsers.innerHTML = ''
  others.map((user) => {
    listUsers(user)
  })

  // map yourself
  yourself.innerHTML = ''
  listMyself(me)
})

// handle online user click
export const handleOnlineUserClick = (user) => {
  const name = chatArea.querySelector('.name')
  if (!chatIcon.classList.contains('hidden')) {
    chatIcon.classList.add('hidden')
  }

  const chatHtml = chatAreaHtml(user.username)

  chatArea.replaceChildren()
  chatArea.innerHTML = chatHtml
  const form = document.querySelector('.input-form')
  form.addEventListener('submit', (e) => onSubmit(e, user))
}

// on chat form submit
const onSubmit = (e, user) => {
  e.preventDefault()

  let input = document.querySelector('.write-message')

  if (!input.value) {
    return alert('Please enter a message')
  }

  // send private message
  socket.emit('private message', {
    from: socket.id,
    fromUsername: username,
    to: user.id,
    toUsername: user.username,
    message: input.value,
  })

  input.value = ''
}

// listen for private message
let trackReciever = ''
socket.on(
  'private message',
  ({ from, fromUsername, to, toUsername, message }) => {
    const chatIcon = document.querySelector('.chat-icon')
    if (!chatIcon.classList.contains('hidden')) {
      chatIcon.classList.add('hidden')

      const chatHtml = chatAreaHtml(fromUsername)

      chatArea.innerHTML = chatHtml
      const user = {
        id: from,
        username: fromUsername,
      }
      const form = document.querySelector('.input-form')
      form.addEventListener('submit', (e) => onSubmit(e, user))
    }

    trackReciever = to

    const name = from === socket.id ? 'You' : fromUsername
    const messagesChat = chat.querySelector('.messages-chat')

    const html = `
      <div class="message">
        <p class="text"><strong>${name}:</strong> ${message}</p>
      </div>`

    messagesChat.insertAdjacentHTML('beforeend', html)
    messagesChat.scrollTop = messagesChat.scrollHeight
  }
)
