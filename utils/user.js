const users = []

// save users
const saveUser = (id, username) => {
  const user = { id, username }
  users.push(user)
  return users
}

// user leave
const userLeave = (userID) => {
  const index = users.findIndex((user) => user.id === userID)

  if (index !== -1) {
    users.splice(index, 1)[0]
  }
  return users
}

module.exports = {
  users,
  saveUser,
  userLeave,
}
