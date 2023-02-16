import { handleOnlineUserClick } from './client.js'
const yourself = document.querySelector('.search')
const onlineUsers = document.querySelector('.online-users')

// list online users
const listUsers = (user) => {
  const discussion = document.createElement('div')
  discussion.classList.add('discussion', 'users', `${user.id}`)

  discussion.addEventListener('click', () => handleOnlineUserClick(user))

  const photo = document.createElement('div')
  photo.classList.add('photo')
  photo.style.backgroundImage =
    'url(http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602)'
  const online = document.createElement('div')
  online.classList.add('online')
  const desContact = document.createElement('div')
  desContact.classList.add('desc-contact')
  const name = document.createElement('p')
  name.classList.add('name')
  name.textContent = user.username

  const message = document.createElement('p')
  message.classList.add('message')
  message.textContent = "Let's meet for a coffee or something today ?"
  const timer = document.createElement('div')
  timer.classList.add('notification')

  onlineUsers.appendChild(discussion)
  discussion.appendChild(photo)
  photo.appendChild(online)
  discussion.appendChild(desContact)
  desContact.appendChild(name)
  desContact.appendChild(message)
  discussion.appendChild(timer)
}

// list myself
const listMyself = (me) => {
  const html = `
          <div class="searchbar" >
            <div class="discussion message-active">
            <div class="photo" style="background-image: url(http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602);">
            <div class="online"></div>
          </div> 
           <div class="desc-contact">
            <p class="name" style="font-weight: bold;">${me.username}</p>
            <p class="message" style="font-weight: bold;">(Yourself)</p>
          </div>
  `
  yourself.insertAdjacentHTML('beforeend', html)
}

// chat area html
const chatAreaHtml = (username) => {
  return `
              <div class="header-chat">
                <i class="icon fa fa-user-o" aria-hidden="true"></i>
                <p class="name">${username}</p>
                <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
              </div>
              
              <div class="messages-chat"></div>
              
              <div class="footer-chat">
                <form class="input-form">
                  <i class="icon fa fa-smile-o clickable" style="font-size:25pt;" aria-hidden="true"></i>
                  <input type="text" class="write-message" style="outline: none;" placeholder="Type your message here"></input>
                  <button type="submit" class="icon send fa fa-paper-plane-o clickable" aria-hidden="true"></button>
                </form>
              </div>
  `
}

export { listUsers, listMyself, chatAreaHtml }
