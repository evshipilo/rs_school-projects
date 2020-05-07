export function showData(filmDataArr, arrOfPosters, filmFullDataArr) {
  document.querySelector('.swiper-wrapper').insertAdjacentHTML('afterbegin',
    `<div class="swiper-slide grey lighten-5">
<div class="title-container center truncate">
<a class="slide-title " href="https://www.imdb.com/title/${filmDataArr[0].imdbID}/videogallery/" target="_blank">
${filmDataArr[0].Title}</a>
</div>
<div class="poster-container">
<div class="no-poster center">
<h5>NO POSTER</h5>
<i class="material-icons  large red-text">event_busy</i>
</div>
<img src="${arrOfPosters[0].value}" alt="" class="poster">
</div>
<div class="slide-footer">
<span>${filmDataArr[0].Year} year.</span>
<i class="material-icons yellow-text star">star</i>
<span>${filmFullDataArr[0].value.imdbRating}</span>
</div>
<div class="center more-info">
<a class="waves-effect waves-light btn-small modal-trigger" href="#modal1">More info</a>
<div id="modal1" class="modal">
    <div class="modal-content left-align">
      <p><u>Title:</u> ${filmFullDataArr[0].value.Title}</p>
      <p><u>Actors:</u> ${filmFullDataArr[0].value.Actors}</p>
      <p><u>Awards:</u> ${filmFullDataArr[0].value.Awards}</p>
      <p><u>BoxOffice:</u> ${filmFullDataArr[0].value.BoxOffice}</p>
      <p><u>Country:</u> ${filmFullDataArr[0].value.Country}</p>
      <p><u>Director:</u> ${filmFullDataArr[0].value.Director}</p>
      <p><u>Genre:</u> ${filmFullDataArr[0].value.Genre}</p>
      <p><u>Plot:</u> ${filmFullDataArr[0].value.Plot}</p>
      <p><u>Production:</u> ${filmFullDataArr[0].value.Production}</p>
      <p><u>Rated:</u> ${filmFullDataArr[0].value.Rated}</p>
      <p><u>Runtime:</u> ${filmFullDataArr[0].value.Runtime}</p>
      <p><u>Website:</u> ${filmFullDataArr[0].value.Website}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn ">OK</a>
    </div>
  </div>
</div>
</div>`);
}
