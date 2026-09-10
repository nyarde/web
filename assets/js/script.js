// References
const form = document.getElementById('add-game-form');
const titleInput = document.getElementById('title-input');
const imgInput = document.getElementById('img-input');
const errorMsg = document.getElementById('form-error');
const gameList = document.getElementById('game-list');
const themeSelect = document.getElementById('theme-select');


function addGame(title, imgSrc) {
    const card = document.createElement('article');
    card.className = 'game-card';

    card.innerHTML = `
    <img src="${imgSrc}" alt="${title}">
    <h3>${title}</h3>
  `;

    gameList.appendChild(card);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const img = imgInput.files[0];

    if (title === '' || !img) {
        errorMsg.textContent = 'Please add title and image.';
        return;
    }

    const reader = new FileReader();



    errorMsg.textContent = '';

    reader.onload = function () {
        addGame(title, reader.result);
        form.reset();
    };

    reader.readAsDataURL(img);
});

function applyTheme(theme) {
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
}

themeSelect.addEventListener('change', function () {
    applyTheme(themeSelect.value);
});


const savedTheme = localStorage.getItem('theme') || 'system';
themeSelect.value = savedTheme;
applyTheme(savedTheme);