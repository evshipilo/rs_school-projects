export function showData(filmDataArr, arrOfPosters, filmFullDataArr, page) {
  for (let i = 0; i < filmDataArr.length; i += 1) {
    const data = filmFullDataArr[i];
    const data1 = filmDataArr[i];

    if (!data.value.Type) data.value.Type = 'N/A';
    if (!data.value.imdbRating) data.value.imdbRating = 'N/A';
    if (!data.value.Actors) data.value.Actors = 'N/A';
    if (!data.value.Awards) data.value.Awards = 'N/A';
    if (!data.value.BoxOffice) data.value.BoxOffice = 'N/A';
    if (!data.value.Country) data.value.Country = 'N/A';
    if (!data.value.Director) data.value.Director = 'N/A';
    if (!data.value.Genre) data.value.Genre = 'N/A';
    if (!data.value.Plot) data.value.Plot = 'N/A';
    if (!data.value.Production) data.value.Production = 'N/A';
    if (!data.value.Rated) data.value.Rated = 'N/A';
    if (!data.value.Released) data.value.Released = 'N/A';
    if (!data.value.Website) data.value.Website = 'N/A';

    if (!data1.Title) data1.Title = 'N/A';
    if (!data1.Year) data1.Year = 'N/A';

    document.querySelector('.swiper-wrapper').insertAdjacentHTML('beforeend',
      `<div class="swiper-slide">
<div class="title-container center truncate">
<a class="slide-title " href="https://www.imdb.com/title/${data1.imdbID}/videogallery/" target="_blank">
${data1.Title}</a>
</div>
<div class="poster-container">
<div class="no-poster center">
<h5 class="red-text">NO POSTER</h5>
<i class="material-icons red-text">event_busy</i>
</div>
<img src="${arrOfPosters[i].value}" alt="" class="poster">
</div>
<div class="slide-footer">
<span>${data1.Year} year.</span>
<i class="material-icons yellow-text star">star</i>
<span>${data.value.imdbRating}</span>
</div>
<div class="center more-info">
<a class="waves-effect waves-light btn-small modal-trigger" href="#modal${i}${page}">More info</a>
</div>
</div>`);

    document.querySelector('.modal-info').insertAdjacentHTML('beforeend', `
    <div id="modal${i}${page}" class="modal">
    <div class="modal-content left-align">
      <p><u>Title:</u> ${data.value.Title}</p>
      <p><u>Type:</u> ${data.value.Type}</p>
      <p><u>Actors:</u> ${data.value.Actors}</p>
      <p><u>Awards:</u> ${data.value.Awards}</p>
      <p><u>BoxOffice:</u> ${data.value.BoxOffice}</p>
      <p><u>Country:</u> ${data.value.Country}</p>
      <p><u>Director:</u> ${data.value.Director}</p>
      <p><u>Genre:</u> ${data.value.Genre}</p>
      <p><u>Plot:</u> ${data.value.Plot}</p>
      <p><u>Production:</u> ${data.value.Production}</p>
      <p><u>Rated:</u> ${data.value.Rated}</p>
      <p><u>Released:</u> ${data.value.Released}</p>
      <p><u>Website:</u> ${data.value.Website}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn ">OK</a>
    </div>
  </div>
    `);
  }
}
