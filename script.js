let currentUser = null;

function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('panel').style.display = 'none';
}

function showRegister() {
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('panel').style.display = 'none';
}

function login() {
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  const panel = document.getElementById('panel');

  if (user === 'admin1' && pass === 'adminsky') {
    currentUser = { role: 'admin', username: user };
    document.getElementById('navButton').innerText = 'Admin panel';
    panel.innerHTML = `<h2>Admin Panel</h2><p>Xush kelibsiz, admin!</p>`;
  } else {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(u => u.username === user && u.password === pass);
    if (found) {
      currentUser = { role: 'user', username: user };
      document.getElementById('navButton').innerText = 'Profil';
      panel.innerHTML = `<h2>Profil</h2><p>Xush kelibsiz, ${user}!</p>`;
    } else {
      panel.innerHTML = `<p>Login yoki parol noto‘g‘ri!</p>`;
    }
  }

  panel.style.display = 'block';
}

function register() {
  const user = document.getElementById('regUser').value;
  const pass = document.getElementById('regPass').value;
  const panel = document.getElementById('panel');

  if (!user || !pass) {
    panel.innerHTML = `<p>Iltimos, barcha maydonlarni to‘ldiring.</p>`;
    panel.style.display = 'block';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const exists = users.find(u => u.username === user);

  if (exists) {
    panel.innerHTML = `<p>Bu user allaqachon mavjud.</p>`;
  } else {
    users.push({ username: user, password: pass });
    localStorage.setItem('users', JSON.stringify(users));
    panel.innerHTML = `<h2>Ro‘yxatdan o‘tildi</h2><p>User: ${user}</p>`;
  }

  panel.style.display = 'block';
}

function handleNav() {
  if (!currentUser) {
    showRegister();
  } else if (currentUser.role === 'admin') {
    showAdminPanel();
  } else {
    showUserProfile();
  }
}

function toggleMenu() {
  const panel = document.getElementById('menuPanel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function showUserList() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  let html = `<h2>Foydalanuvchilar</h2><ul>`;
  users.forEach(u => {
    html += `<li>${u.username} <button onclick="banUser('${u.username}')">Ban</button></li>`;
  });
  html += `</ul>`;
  document.getElementById('panel').innerHTML = html;
  document.getElementById('panel').style.display = 'block';
}

function banUser(username) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.filter(u => u.username !== username);
  localStorage.setItem('users', JSON.stringify(users));
  showUserList();
}

function showAnimeList() {
  const html = `
    <h2>Anime Tizimi</h2>
    <ul>
      <li>Naruto <button>O‘chirish</button> <button>O‘zgartirish</button></li>
      <li>Demon Slayer <button>O‘chirish</button> <button>O‘zgartirish</button></li>
      <li>Attack on Titan <button>O‘chirish</button> <button>O‘zgartirish</button></li>
    </ul>
  `;
  document.getElementById('panel').innerHTML = html;
  document.getElementById('panel').style.display = 'block';
}

function showAdminPanel() {
  document.getElementById('panel').innerHTML = `<h2>Admin Panel</h2><p>≡ tugmasi orqali bo‘limlarga o‘ting.</p>`;
  document.getElementById('panel').style.display = 'block';
}

function showUserProfile() {
  document.getElementById('panel').innerHTML = `<h2>
