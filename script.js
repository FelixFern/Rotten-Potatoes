const API_KEY = 'api_key=4a2f5c42b8d2cf6178787473ff9d8970';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+ API_KEY;

gridView()

function gridView() {
    gridViewData(API_URL)
}

function gridViewData(url) {
    document.getElementById("grid").className = "current-toggle";
    document.getElementById("list").className = "";
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovieGrid(data.results)
    })
}

function showMovieGrid(data) {
    const movie_container = document.getElementById('movie-container');
    movie_container.innerHTML = ''
    data.forEach(movie => {
        const {title, poster_path, vote_average} = movie;
        console.log(title)
        const movieEl = document.createElement("div");
        movieEl.classList.add('card');
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="" class="poster">
            <div class="rating">
                <img src="img/potato.png" alt="">
                <p>${percentage(vote_average)} %</p>
            </div>
            <h2>${title}</h2>
                
            `
        console.log(movieEl)
        movie_container.appendChild(movieEl);
    })
}

function listView() {
    listViewData(API_URL)
}

function listViewData(url) {
    document.getElementById("list").className = "current-toggle";
    document.getElementById("grid").className = "";
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovieList(data.results)
    })
}
function showMovieList(data) {
    const movie_container = document.getElementById('movie-container');
    movie_container.innerHTML = ''
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, genres, release_date} = movie;
        console.log(title)
        const movieEl = document.createElement("div");
        movieEl.classList.add('list');
        movieEl.innerHTML = `
            <div class="list-left"><img class="poster-list" src="${IMG_URL + poster_path}" alt=""></div>
            <div class="list-right">
                <div class="rating">
                    <img src="img/potato.png" alt="">
                    <p>${percentage(vote_average)} %</p>
                </div>
                <h2>${title}</h2>
                <p>${overview}</p>
                <p>Release Date : ${release_date}</p>
            </div>
                
            `
        console.log(movieEl)
        movie_container.appendChild(movieEl);
    })
}

function getColor(rating) {
    if(rating >= 8) {
        return "green"
    } else if(rating >= 5) {
        return "yellow"
    } else {
        return "red"
    }
}

function percentage(rating) {
    return rating*10
}