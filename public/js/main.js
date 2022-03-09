const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Untuk mendapatkan username dan room
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

  


// Untuk masuk ke room obrolan
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Pesan dari server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Untuk scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Submit pesan
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Dapatkan teks pesan
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Kirim pesan ke server
  socket.emit('chatMessage', msg);

  // Hapus masukan
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Keluarkan pesan ke DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Tambahkan nama ruangan ke DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Tambahkan pengguna ke DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Minta pengguna sebelum meninggalkan ruang obrolan
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Apakah Anda yakin ingin meninggalkan ruang obrolan?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});


