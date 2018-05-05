const filmographyURL =
  "https://api.themoviedb.org/3/person/{person_id}/combined_credits?api_key=SECRET&language=en-US";

function getActorDataFromApi(searchTerm, callback) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://api.themoviedb.org/3/search/person?api_key=SECRET&language=en-US&query=${searchTerm}&page=1&include_adult=false`,
    method: "GET",
    data: "{}"
  };
  $.ajax(settings).done(function(response) {
    //console.log(response);
    let filmURL = getfilmURL(getID(getResults(response)));
    getFilmographyFromApi(filmURL, callback);
  });
}

function getResults(response) {
  return response.results;
}

function getID(results) {
  return results[0].id;
}

function getfilmURL(personID) {
  return filmographyURL.replace("{person_id}", personID);
}

function getFilmographyFromApi(url, callback) {
  const settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    data: "{}"
  };
  $.ajax(settings).done(callback);
}

function displayFilmData(data) {
  console.log(data);
  const results = data.cast.map((item, index) => renderResult(item));
  $(".filmBox").html(results);
  //console.log(results);
}

function renderResult(item) {
  return `<li>${item.name || item.title}</li>`;
}

function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find(".js-filmQuery");
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getActorDataFromApi(query, displayFilmData);
  });
}

// This product uses the TMDb API but is not endorsed or certified by TMDb.
$(watchSubmit);
