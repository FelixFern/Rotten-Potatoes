const API_KEY = 'api_key=4a2f5c42b8d2cf6178787473ff9d8970';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?'+ API_KEY;

var currentData = API_URL
var currentView = "grid"

gridView()

function gridView() {
    gridViewData(currentData)
    currentView = "Grid"
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
    var counter = 0;
    data.forEach(movie => {
        const {title, poster_path, vote_average} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add('card');
        movieEl.innerHTML = `
            <img id=${counter} src="${IMG_URL + poster_path}" alt="" class="poster">
            <div id=${counter} class="rating">
                <img id=${counter} src="img/potato.png" alt="">
                <p id=${counter}>${percentage(vote_average)} %</p>
            </div>
            <h2 id=${counter}>${title}</h2>
                
            `
        console.log(movieEl)
        movie_container.appendChild(movieEl);
        counter += 1
    })
}

function listView() {
    listViewData(currentData)
    currentView = "List"
}

function listViewData(url) {
    document.getElementById("list").className = "current-toggle";
    document.getElementById("grid").className = "";
    fetch(url).then(res => res.json()).then(data => {
        showMovieList(data.results)
    })
}
function showMovieList(data) {
    const movie_container = document.getElementById('movie-container');
    movie_container.innerHTML = ''
    var counter = 0;
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, original_language, release_date} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add('list');
        movieEl.innerHTML = `
            <div id=${counter} class="list-left"><img id=${counter}  class="poster-list" src="${IMG_URL + poster_path}" alt=""></div>
            <div id=${counter} class="list-right">
                <div id=${counter} class="rating">
                    <img id=${counter} src="img/potato.png" alt="">
                    <p id=${counter}>${percentage(vote_average)} %</p>
                </div>
                <h2 id=${counter}>${title}</h2>
                <p id=${counter}>Language : ${original_language}</p>
                <p id=${counter} class="overview">${overview}</p>
                <p id=${counter}>Release Date : ${release_date}</p>
            </div>       
            `
            movie_container.appendChild(movieEl);
            counter += 1
    })
}

function percentage(rating) {
    return rating*10
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        search = document.getElementById("search-bar").value;
        console.log(search)
        currentData = SEARCH_URL+'&query='+search
        if(currentView == "Grid" && search != "") {
            gridViewData(SEARCH_URL+'&query='+search)
        } else if (currentView == "List" && search != "") {
            listViewData(SEARCH_URL+'&query='+search)
        } else {
            window.alert("Masukkan judul film yang ingin dicari");
        }
    }
});

document.getElementById('movie-container').addEventListener('click', (e) => {
    var index = e.target.id
    console.log(index)
    var dataIndex = {};
    fetch(currentData).then(res => res.json()).then(data => {
        var dataIndex = data.results[index];
        console.log(index)
        const popup_container = document.getElementById('popup');
        popup_container.style.display = "block";
        popup_container.innerHTML = `
        <div class="popup-content">
            <div class="left-side-popup">
                <img class="popup-poster" src="${IMG_URL + dataIndex.poster_path}" alt="">
            </div>
            <div class="right-side-popup">
                <div class="rating">
                    <img src="img/potato.png" alt="">
                    <p>${percentage(dataIndex.vote_average)} %</p>
                </div>
                <h2>${dataIndex.title}</h2>
                <p>Language : ${dataIndex.original_language}</p>
                <p class="overview">${dataIndex.overview}</p>
                <p>Release Date : ${dataIndex.release_date}</p>
                <button class="back-button" onclick="closePopup()">Back</button>
            </div>
        </div>
        `   
    })
    
})

function closePopup() {
    document.getElementById("popup").style.display = "none"
}