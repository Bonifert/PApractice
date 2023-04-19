import { products } from '/data.js';

// Little functions

function createHtmlString(tag, content) {
  return `<${tag}>${content}</${tag}>`;
}

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
  displayAllAlbumThatRequiresShipping(products);
  totalPrice(products);
  groupByVendor(products); // pl ez
  averagePrice(products);
  totalNumberOfTrack(products);
  displayAllAvailableAlbum(products);
  productAndItsVendor(products); // pl ez
  sumBytes(products);
};

window.addEventListener("load", loadEvent);

// product list display html task

function displayAlbums(albums){
  albums.forEach((album) => {
    let songs = "";

    const albumContent =  divElement(`<button>+</button>
                          ${hElement(album.name, 1)}
                          ${hElement(album.status, 2)}`);
    album.details.forEach((track) => {
      songs +=  divElement(`${hElement(track.name, 3)}
                ${pElement(`This song is ${Math.round(track.milliseconds / 1000)} second.`)}
                ${pElement(track.composer)}`);
    });
    getRoot().insertAdjacentHTML("beforeend", divElement(albumContent + divElement(songs)));
  });
}

// tasks
// PA 1, taks 1

function searchAlbums(albums, namePart){
  const searchedAlbums = [];

  for (const album of albums){
    if (album.name.includes(namePart)){
      searchedAlbums.push(album);
    }
  }

  return albums.filter(album => album.name.includes(namePart))

  return searchedAlbums;
}

// PA 1, task 2

function averageTrackCount(albums){
  let sumTrack = 0;

  for (const album of albums){
    sumTrack += album.details.length;
  }
  return sumTrack / albums.length;
}

// PA 1, task 3

function getAlbumsWithHigherPrice(minPrice){
  const resultArray = [];

  for (const album of products){
    if (album.price > minPrice){
      resultArray.push(album);
    }
  }
  return resultArray;
}

// PA 2, task 1

function getAlbumRuntime(product){
  let resultMilliseconds = 0;

  for (const track of product.details){
    resultMilliseconds += track.milliseconds;
  }
    
  return (resultMilliseconds / 1000);
}

// PA 2, task 2

function getMostValuableAlbumForRuntime(albums){
  let mostValuable = albums[0];

  for (let index = 1; index < albums.length; index++){
    const pricePerSecondCurrent = albums[index].price / getAlbumRuntime(albums[index]);
    const pricePerSecondMax = mostValuable.price / getAlbumRuntime(mostValuable);
    if (pricePerSecondCurrent > pricePerSecondMax){
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
    if (!genres.includes(track.genre_id)){
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
  const artistNames = new Set();

  for (const album of albums){
    if (!album.vendor.name.includes(" ")){
      artistNames.add(album.vendor.name);
    }
  }

  console.log(artistNames);
  return Array.from(artistNames);
}

// EXTRA 1

function getMostComplexSong(albums){  // TODO: divide function into two
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

function displayAllAlbumThatRequiresShipping(albums){
  console.log(albums.filter((element) => element["requires_shipping"]));
  return albums.filter((element) => element["requires_shipping"]);
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

// EXTRA 2, task 7

function displayAllAvailableAlbum(albums){
  console.log(albums.filter((element) => element.status === "available"));
  return albums.filter((element) => element.status === "available");
}

// EXTRA 2, task 8

function productAndItsVendor(albums){
  const productsAndVendors = {};

  for (const album of albums){
    productsAndVendors[album.name] = album.vendor.name;
  }

  console.log(productsAndVendors);
  return productsAndVendors;
}

// EXTRA 2, task 9

function sumBytes(albums){
  let allBytes = 0;

  for (const album of albums){
    for (const track of album.details){
      allBytes += track.bytes;
    }
  }

  console.log(allBytes);
  return allBytes;
}

