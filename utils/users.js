const users = [];

// Untuk join pengguna
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Untuk menambah pengguna
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// Untuk tombol keluar
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Untuk room
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
