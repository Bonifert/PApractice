import { products } from '/data.js';

// Little functions

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

const loadEvent = function() {
  displayAlbums(products);
  getMostComplexSong(products);
  searchAlbums("World");
  averageTrackCount(products);
  getAlbumsWithHigherPrice(1200);
  getAlbumRuntime(products[2]);
  getMostValuableAlbumForRuntime(products);
  getGenreCount(products[140]);
  getAlbumsWithMultipleGenres(products);
  getOneWordArtistNames(products);
  displayAllAvailableAlbum(products);
  totalPrice(products);
  groupByVendor(products);
  averagePrice(products);
  totalNumberOfTrack(products);
};

window.addEventListener("load", loadEvent);

// tasks

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


// PA 1, taks 1

function searchAlbums(namePart){
  const searchedAlbums = [];

  for (const album of products){
    if (album.name.includes(namePart)){
      searchedAlbums.push(album);
    }
  }
  console.log(searchedAlbums);
}

// PA 1, task 2

function averageTrackCount(albums){
  let sumTrack = 0;

  for (const album of albums){
    sumTrack += album.details.length;
  }
  console.log(sumTrack / albums.length);
}

// PA 1, task 3

function getAlbumsWithHigherPrice(minPrice){
  const resultArray = [];

  for (const album of products){
    if (album.price > minPrice){
      resultArray.push(album);
    }
  }
  console.log(resultArray);
}

// PA 2, task 1

function getAlbumRuntime(product){
  let resultMilliseconds = 0;

  for (const album of products){
    if (album === product){
      for (const track of album.details){
        resultMilliseconds += track.milliseconds;
      }
    }
  }
  return (resultMilliseconds / 1000);
}

// PA 2, task 2

function getMostValuableAlbumForRuntime(albums){
  let mostValuable = albums[0];

  for (let index = 1; index < albums.length; index++){
    const isBetter = (albums[index].price / getAlbumRuntime(albums[index])) > (mostValuable.price / getAlbumRuntime(mostValuable));
    if (isBetter){
      mostValuable = albums[index];
    }
  }
  console.log(mostValuable);
}

// PA 3, task 1

function getGenreCount(album){
  let numberOfGenres = 0;
  const genres = [];

  for (const track of album.details){
    if (!genres.includes(track["genre_id"])){
      numberOfGenres++;
      genres.push(track["genre_id"]);
    }
  }
  console.log(numberOfGenres);
  return numberOfGenres;
}

// PA 3, task 2

function getAlbumsWithMultipleGenres(albums){
  const finalAlbums = [];

  for (const album of albums){
    if (getGenreCount(album) > 1){
      finalAlbums.push(album);
    }
  }
  console.log(finalAlbums);
  return finalAlbums;
}

// PA 3, task 3

function getOneWordArtistNames(albums){
  const artistNames = [];

  for (const album of albums){
    if (!album.vendor.name.includes(" ") && !artistNames.includes(album.vendor.name)){
      artistNames.push(album.vendor.name);
    }
  }
  console.log(artistNames);
  return artistNames;
}

// EXTRA 1

function getMostComplexSong(albums){
  const songsWithComplexity = [];
  let mostComplex = "";
  let highestComplexity = 0;

  for (const album of albums){
    for (const track of album["details"]){
      songsWithComplexity.push({
        name: track.name,
        complexity: track.bytes / track.milliseconds,
      });
    }
  }

  for (const track of songsWithComplexity){
    if (track.complexity > highestComplexity){
      mostComplex = track.name;
      highestComplexity = track.complexity;
    }
  }

  console.log(mostComplex, highestComplexity);
}

// EXTRA 2, task 2

function displayAllAvailableAlbum(albums){
  console.log(albums.filter(element => element["requires_shipping"]));
  return albums.filter(element => element.status === "available");
}

// EXTRA 2, task 3

function totalPrice(albums){
  let total = 0;

  for (const album of albums){
    total += album.price;
  }

  console.log(total);
  return total;
}

// EXTRA 2, task 4

function groupByVendor(albums){
  const vendors = {};

  for (const album of albums){
    if (vendors[album.vendor.name]){
      vendors[album.vendor.name] += 1;
    } else {
      vendors[album.vendor.name] = 1;
    }
  }

  console.log(vendors);
  return vendors;
}

// EXTRA 2, task 5

function averagePrice(albums){
  console.log(totalPrice(albums) / albums.length);
  return totalPrice(albums) / albums.length;
}

// EXTRA 2, task 6

function totalNumberOfTrack(albums){
  let total = 0;

  for (const album of albums){
    total += album.details.length;
  }

  console.log(total);
  return total;
}
