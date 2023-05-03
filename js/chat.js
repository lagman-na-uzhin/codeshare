socket.on('session-users', users => {
    const chatUserList = document.querySelector('#chatUserList');
    let output = '';

    for (const user of users) {
        output += `<li class="clearfix">
      <img src="https://ui-avatars.com/api/?name=${user.username}&background=random" alt="Avatar" />
      <div style="margin-top: 6%;" class="about">
        <div class="name">${user.username}</div>
      </div>
    </li>`;
    }

    chatUserList.innerHTML = output;
});

const chatForm = document.querySelector('#chatForm');

chatForm.addEventListener('submit', e => {
    e.preventDefault();

    let message = e.target.elements.message.value;
    message = message.trim();

    if (!message) return;

    socket.emit('chat-message', message);

    e.target.elements.message.value = '';
    e.target.elements.message.focus();

    document.querySelector('#messageArea').innerHTML += `
    <li class="clearfix">
    <div class="message-data float-right">
        <span style="font-weight: bold">${userName}</span>
        <span class="message-data-time">${formatTime(new Date())}</span>
    </div>
    <div class="message other-message">
        ${message}
    </div>
    </li>`;

    const chatArea = document.querySelector('#chat-area');
    chatArea.scrollTop = chatArea.scrollHeight;
});

socket.on('chat-message', (uName, message) => {
    const messageArea = document.querySelector('#messageArea');
    messageArea.innerHTML += `<li class="clearfix">
    <div class="message-data">
      <span style="font-weight: bold">${uName}</span>
      <span class="message-data-time">${formatTime(new Date())}</span>
      </div>
      <div class="message my-message">${message}</div>
  </li>`;

    const chatArea = document.querySelector('#chat-area');
    chatArea.scrollTop = chatArea.scrollHeight;
});

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
