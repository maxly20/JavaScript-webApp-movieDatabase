const APIUrl =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=51f46c52ae40eb85f8d63fb3cd72efd5&page=1';
const ImgPath = 'https://image.tmdb.org/t/p/w1280';
const SearchAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=51f46c52ae40eb85f8d63fb3cd72efd5&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// initially get fav movies
getMovies(APIUrl);

async function getMovies(url) {
  const response = await fetch(url);
  const Data = await response.json();

  showMovies(Data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
            <img
                src="${ImgPath + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SearchAPI + searchTerm);

    search.value = '';
  }
});
