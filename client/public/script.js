import { products } from '/data.js';


const divElement = function (content){
  return `<div>${content}</div>`;
};
const hElement = function (content, number){
  return `<h${number}>${content}</h${number}>`;
};
const pElement = function (content){
  return `<p>${content}</p>`;
};
function getRoot(){
  return document.getElementById("root");
}

function displayAlbums(albums){
  albums.forEach((album) => {
    let songs = "";

    const albumContent =  divElement(`<button>+</button>
                          ${hElement(album.name, 1)}
                          ${hElement(album["status"], 2)}`);
    album.details.forEach((track) => {
      songs +=  divElement(`${hElement(track.name, 3)}
                ${pElement(`This song is ${Math.round(track.milliseconds / 1000)} second.`)}
                ${pElement(track.composer)}`);
    });
    getRoot().insertAdjacentHTML("beforeend", divElement(albumContent + divElement(songs)));
  });
}

const loadEvent = function() {
  displayAlbums(products);
};

window.addEventListener("load", loadEvent);


