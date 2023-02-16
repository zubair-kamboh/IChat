let messages = []

const saveMessage = ({ from, to, toUsername, message }) => {
  messages.push({ from, to, toUsername, message })
  console.log(messages)
}

module.exports = { saveMessage, messages }
