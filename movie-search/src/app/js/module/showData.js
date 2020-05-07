export function showData(filmDataArr, arrOfPosters, filmFullDataArr, page) {
  for (let i = 0; i < filmDataArr.length; i += 1) {
    document.querySelector('.swiper-wrapper').insertAdjacentHTML('beforeend',
      `<div class="swiper-slide">
<div class="title-container center truncate">
<a class="slide-title " href="https://www.imdb.com/title/${filmDataArr[i].imdbID}/videogallery/" target="_blank">
${filmDataArr[i].Title}</a>
</div>
<div class="poster-container">
<div class="no-poster center">
<h5 class="red-text">NO POSTER</h5>
<i class="material-icons red-text">event_busy</i>
</div>
<img src="${arrOfPosters[i].value}" alt="" class="poster">
</div>
<div class="slide-footer">
<span>${filmDataArr[i].Year} year.</span>
<i class="material-icons yellow-text star">star</i>
<span>${filmFullDataArr[i].value.imdbRating}</span>
</div>
<div class="center more-info">
<a class="waves-effect waves-light btn-small modal-trigger" href="#modal${i}${page}">More info</a>

</div>
</div>`);

    document.querySelector('.modal-info').insertAdjacentHTML('beforeend', `
    <div id="modal${i}${page}" class="modal">
    <div class="modal-content left-align">
      <p><u>Title:</u> ${filmFullDataArr[i].value.Title}</p>
      <p><u>Type:</u> ${filmFullDataArr[i].value.Type}</p>
      <p><u>Actors:</u> ${filmFullDataArr[i].value.Actors}</p>
      <p><u>Awards:</u> ${filmFullDataArr[i].value.Awards}</p>
      <p><u>BoxOffice:</u> ${filmFullDataArr[i].value.BoxOffice}</p>
      <p><u>Country:</u> ${filmFullDataArr[i].value.Country}</p>
      <p><u>Director:</u> ${filmFullDataArr[i].value.Director}</p>
      <p><u>Genre:</u> ${filmFullDataArr[i].value.Genre}</p>
      <p><u>Plot:</u> ${filmFullDataArr[i].value.Plot}</p>
      <p><u>Production:</u> ${filmFullDataArr[i].value.Production}</p>
      <p><u>Rated:</u> ${filmFullDataArr[i].value.Rated}</p>
      <p><u>Released:</u> ${filmFullDataArr[i].value.Released}</p>
      <p><u>Website:</u> ${filmFullDataArr[i].value.Website}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn ">OK</a>
    </div>
  </div>
    `);
  }
}
