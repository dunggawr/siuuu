const ul = document.querySelector('.animelist ul');
const forms = document.forms;

// delete anime
ul.addEventListener('click', (e) => {
    if (e.target.className == 'animelist__delete') {
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
    }
    saveAnime();
})

// filter anime
const searchAnime = forms['anime__search'];
searchAnime.addEventListener('keyup', (e) => {
    e.preventDefault();

    const input = searchAnime.querySelector('input');
    const filter = input.value.toUpperCase();
    const li = ul.querySelectorAll('li');

    for (i = 0; i < li.length; i++) {
        const span = li[i].querySelector('.animelist__name');
        const name = span.textContent;
        if (name.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ''
        } else {
            li[i].style.display = 'none';
        }
    }
})

//save animes
function saveAnime() {
    let listAnime = [];

    const li = ul.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        const span = li[i].querySelector('.animelist__name');
        let nameInfor = {
            'name': span.textContent,
            'completed': li[i].classList.contains('completed')
        }
        listAnime.push(nameInfor);
    }

    localStorage.setItem('listAnime', JSON.stringify(listAnime));
}

// load animes
function loadAnimes() {
    if (localStorage.getItem('listAnime') != null) {
        let listAnime = JSON.parse(localStorage.getItem('listAnime'));
        ul.innerHTML = '';

        for (let i = 0; i < listAnime.length; i++) {
            let Anime = listAnime[i];
            watchAnime(Anime.name, Anime.completed);
        }
    }
}

// watch anime
function watchAnime(inputValue, completed) {
    const li = document.createElement('li');
    const animeName = document.createElement('span');
    const deleteButton = document.createElement('span');

    // add text content
    animeName.textContent = inputValue;
    deleteButton.textContent = 'delete';

    // add class
    animeName.classList.add('animelist__name');
    deleteButton.classList.add('animelist__delete');

    li.appendChild(animeName);
    li.appendChild(deleteButton);

    if (completed) {
        li.classList.add('completed');
    }

    ul.appendChild(li);

    li.addEventListener('click', vuong);

    // reset input
    document.querySelector('.animeAdd input').value = '';
}

function vuong() {
    if (this.classList.contains('completed')) {
        this.classList.remove('completed');
    } else {
        this.classList.add('completed');
    }
    saveAnime();
}

// add anime
const addform = forms['animeAdd'];
addform.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = e.target.querySelector('input').value;
    if (input == '') {
        alert('please enter anime');
        return;
    }
    watchAnime(input, false);
    saveAnime();
})

loadAnimes();
saveAnime();