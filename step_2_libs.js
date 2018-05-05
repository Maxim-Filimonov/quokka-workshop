const _ = require("lodash/fp");

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
    let filmURL = getfilmURL(getID(getResults(response)));
    getFilmographyFromApi(filmURL, callback);
  });
}

const getResults = _.property("results");
console.log(getResults({ results: "yaooo" }));

const getID = _.compose(_.prop("id"), _.first);
console.log(getID([{ id: 123 }]));

const getfilmURL = _.replace("{person_id}", _.__, filmographyURL);
console.log(getfilmURL("BradPitt"));

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
  if (item.name || item.magic) {
    return `<li>${item.name}</li>`;
  } else {
    return `<li>${item.title}</li>`;
  }
}
console.log(renderResult(null));

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
// $(watchSubmit);
