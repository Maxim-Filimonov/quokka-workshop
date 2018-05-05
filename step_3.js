const fetch = require("node-fetch");
const _ = require("lodash");

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(json => {
    console.log(json);
    console.log(exploreValue(json));
  });
