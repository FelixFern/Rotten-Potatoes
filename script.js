const API_KEY = 'api_key=4a2f5c42b8d2cf6178787473ff9d8970';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+ API_KEY;

getMovie(API_URL)

function getMovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovie(data.results)
    })
}

function showMovie(data) {
    const card_container = document.getElementById('card-container');
    card_container.innerHTML = ''
    console.log(card_container)

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add('card');
        movieEl.innerHTML = `
                <div class="movie-card"> 
                    <img src="${IMG_URL + poster_path}" alt="${title}">
                    <div class="content">
                        <h2 class="movie-title">${title}</h2>
                        <p class="movie-desc">${overview}</p>
                        <p>Rating : ${vote_average}</p>
                        <p><a href="#" class="movie-detail">Movie Detail</a></p>
                    </div>
                </div>
                
            `
        console.log(movieEl)
        card_container.appendChild(movieEl);
        console.log("test");
    })
}