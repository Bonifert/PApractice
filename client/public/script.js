import { products } from "/data.js";

// Little functions

function getElement(tag, content, id) {
  if (id) {
    return `<${tag} id="${id}">${content}</${tag}>`;
  }
  return `<${tag}>${content}</${tag}>`;
}

function getRoot() {
  return document.getElementById("root");
}

const loadEvent = function () {
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
  groupByVendor(products);
  averagePrice(products);
  totalNumberOfTrack(products);
  displayAllAvailableAlbum(products);
  productAndItsVendor(products);
  sumBytes(products);
  averageMilli(products);
  taxableFilter(products);
  groupByGenre(products);
  angusYoung(products);
  addButtonAndEventListener(getRoot);
  totalUniqueVendors(products);
  displayNamePriceVendor(products);
  numberOfTrackWithUnitPrice(products, 0.99);
  filterByACDC(products);
  averageBytes(products);
  groupAndDisplayByMediaType(products);
  numberOfTracksComposedBySomeone(products, "Brian Johnson");
};

window.addEventListener("load", loadEvent);

// product list display html task

function displayAlbums(albums) {
  albums.forEach((album) => {
    let songs = "";

    const albumContent = getElement(
      "div",
      `${getElement("h1", `The album's name: ${album.name}`)}
      ${getElement("p", "Add to the favourites: <button>+</button>")}
      ${getElement("h2", `The album is ${album.status} at the moment.`)}
      ${getElement("h3", `Price: ${album.price}`)}`
    );
    album.details.forEach((track) => {
      songs += getElement(
        "li",
        getElement(
          "div",
          `${getElement("h3", `Title: ${track.name}`)}
          ${getElement("p", `This song is ${Math.round(track.milliseconds / 1000)} seconds.`)}
          ${getElement("p", `The composer/s: ${track.composer}`)}`
        )
      );
    });
    getRoot().insertAdjacentHTML(
      "beforeend",
      getElement(
        "div",
        albumContent +
          getElement("div", `${getElement("h3", "The songs:")}${getElement("ul", songs)}`)
      )
    );
  });
}

// tasks
// PA 1, taks 1

function searchAlbums(namePart) {
  const searchedAlbums = [];

  for (const album of products) {
    if (album.name.includes(namePart)) {
      searchedAlbums.push(album);
    }
  }

  console.log(searchedAlbums);
}

// PA 1, task 2

function averageTrackCount(albums) {
  let sumTrack = 0;

  for (const album of albums) {
    sumTrack += album.details.length;
  }

  console.log(sumTrack / albums.length);
}

// PA 1, task 3

function getAlbumsWithHigherPrice(minPrice) {
  const resultArray = [];

  for (const album of products) {
    if (album.price > minPrice) {
      resultArray.push(album);
    }
  }

  console.log(resultArray);
}

// PA 2, task 1

function getAlbumRuntime(product) {
  let resultMilliseconds = 0;

  for (const album of products) {
    if (album === product) {
      for (const track of album.details) {
        resultMilliseconds += track.milliseconds;
      }
    }
  }

  return resultMilliseconds / 1000;
}

// PA 2, task 2

function getMostValuableAlbumForRuntime(albums) {
  let mostValuable = albums[0];

  for (let index = 1; index < albums.length; index++) {
    const isBetter =
      albums[index].price / getAlbumRuntime(albums[index]) >
      mostValuable.price / getAlbumRuntime(mostValuable);
    if (isBetter) {
      mostValuable = albums[index];
    }
  }

  console.log(mostValuable);
}

// PA 3, task 1

function getGenreCount(album) {
  let numberOfGenres = 0;
  const genres = [];

  for (const track of album.details) {
    if (!genres.includes(track["genre_id"])) {
      numberOfGenres++;
      genres.push(track["genre_id"]);
    }
  }

  console.log(numberOfGenres);
  return numberOfGenres;
}

// PA 3, task 2

function getAlbumsWithMultipleGenres(albums) {
  const finalAlbums = [];

  for (const album of albums) {
    if (getGenreCount(album) > 1) {
      finalAlbums.push(album);
    }
  }

  console.log(finalAlbums);
  return finalAlbums;
}

// PA 3, task 3

function getOneWordArtistNames(albums) {
  const artistNames = [];

  for (const album of albums) {
    if (!album.vendor.name.includes(" ") && !artistNames.includes(album.vendor.name)) {
      artistNames.push(album.vendor.name);
    }
  }

  console.log(artistNames);
  return artistNames;
}

// EXTRA 1

function getMostComplexSong(albums) {
  const songsWithComplexity = getsongsComplexity(albums);
  console.log(mostComplexSong(songsWithComplexity));
  return mostComplexSong(songsWithComplexity);
}

function getsongsComplexity(albumsArray) {
  const songsNameAndComplexity = [];

  for (const album of albumsArray) {
    for (const track of album.details) {
      songsNameAndComplexity.push({
        name: track.name,
        complexity: track.bytes / track.milliseconds,
      });
    }
  }

  return songsNameAndComplexity;
}

function mostComplexSong(array) {
  let mostComplex = "";
  let highestComplexity = 0;

  for (const track of array) {
    if (track.complexity > highestComplexity) {
      mostComplex = track.name;
      highestComplexity = track.complexity;
    }
  }

  return mostComplex;
}

// EXTRA 2, task 2

function displayAllAlbumThatRequiresShipping(albums) {
  console.log(albums.filter((element) => element["requires_shipping"]));
  return albums.filter((element) => element["requires_shipping"]);
}

// EXTRA 2, task 3

function totalPrice(albums) {
  let total = 0;

  for (const album of albums) {
    total += album.price;
  }

  console.log(total);
  return total;
}

// EXTRA 2, task 4

function groupByVendor(albums) {
  const vendors = {};

  for (const album of albums) {
    if (vendors[album.vendor.name]) {
      vendors[album.vendor.name] += 1;
    } else {
      vendors[album.vendor.name] = 1;
    }
  }

  console.log(vendors);
  return vendors;
}

// EXTRA 2, task 5

function averagePrice(albums) {
  console.log(totalPrice(albums) / albums.length);
  return totalPrice(albums) / albums.length;
}

// EXTRA 2, task 6

function totalNumberOfTrack(albums) {
  let total = 0;

  for (const album of albums) {
    total += album.details.length;
  }

  console.log(total);
  return total;
}

// EXTRA 2, task 7

function displayAllAvailableAlbum(albums) {
  console.log(albums.filter((element) => element.status === "available"));
  return albums.filter((element) => element.status === "available");
}

// EXTRA 2, task 8

function productAndItsVendor(albums) {
  const productsAndVendors = {};

  for (const album of albums) {
    productsAndVendors[album.name] = album.vendor.name;
  }

  console.log(productsAndVendors);
  return productsAndVendors;
}

// EXTRA 2, task 9

function sumBytes(albums) {
  let allBytes = 0;

  for (const album of albums) {
    for (const track of album.details) {
      allBytes += track.bytes;
    }
  }

  console.log(allBytes);
  return allBytes;
}

// EXTRA 2, task 10

function averageMilli(albums) {
  let sumOfAverageMilliPerAlbum = 0;

  for (const album of albums) {
    let sumAlbumMilli = 0;

    for (const track of album.details) {
      sumAlbumMilli += track.milliseconds;
    }
    sumOfAverageMilliPerAlbum += sumAlbumMilli / album.details.length;
  }

  console.log(sumOfAverageMilliPerAlbum / albums.length);
  return sumOfAverageMilliPerAlbum / albums.length;
}

// EXTRA 2, task 11

function taxableFilter(albums) {
  console.log(albums.filter((album) => album.taxable));
  return albums.filter((album) => album.taxable);
}

// EXTRA 2, taks 12

function totalUniqueVendors(albums) {
  const vendors = new Set();

  for (const album of albums) {
    vendors.add(album.vendor.name);
  }

  return Array.from(vendors);
}

// EXTRA 2, task 13

function displayNamePriceVendor(albums) {
  const result = [];

  for (const album of albums) {
    result.push({
      name: album.name,
      price: album.price,
      vendor: album.vendor.name,
    });
  }

  console.log(result);
}

// EXTRA 2, task 14

function numberOfTrackWithUnitPrice(albums, unitPrice) {
  let trackNumber = 0;

  for (const album of albums) {
    for (const track of album.details) {
      if (track.unit_price === unitPrice) {
        trackNumber++;
      }
    }
  }

  console.log(trackNumber);
  return trackNumber;
}

// EXTRA 2, task 15

function groupByGenre(albums) {
  const genres = {};

  for (const album of albums) {
    for (const track of album.details) {
      if (genres[track.genre_id]) {
        genres[track.genre_id]++;
      } else {
        genres[track.genre_id] = 1;
      }
    }
  }

  console.log(genres);
  return genres;
}

// EXTRA 2, task 16 with changes, display with button

function angusYoung(albums) {
  const angusTracks = [];

  for (const album of albums) {
    for (const track of album.details) {
      if (track.composer && track.composer.includes("Angus Young")) {
        angusTracks.push(track.name);
      }
    }
  }

  return angusTracks.join("<br>");
}

function addButtonAndEventListener(root) {
  root().insertAdjacentHTML("afterbegin", "<button>+</button>");
  root()
    .querySelector("button")
    .addEventListener("click", function () {
      root().insertAdjacentHTML("afterbegin", angusYoung(products));
    });
}

// EXTRA 2, task 17

function filterByACDC(albums) {
  console.log(albums.filter((album) => album.vendor.name === "AC/DC"));
  return albums.filter((album) => album.vendor.name === "AC/DC");
}

// EXTRA 2, task 18

function averageBytes(albums) {
  let averageAlbumBytesSum = 0;

  for (const album of albums) {
    let bytesSum = 0;

    for (const track of album.details) {
      bytesSum += track.bytes;
    }
    averageAlbumBytesSum += bytesSum / album.details.length;
  }

  console.log(averageAlbumBytesSum / albums.length);
  return averageAlbumBytesSum / albums.length;
}

// EXTRA 2, task 19

function groupAndDisplayByMediaType(albums) {
  const mediaTypes = {};

  for (const album of albums) {
    if (album.details[0].media_type_id in mediaTypes) {
      mediaTypes[album.details[0].media_type_id] += 1;
    } else {
      mediaTypes[album.details[0].media_type_id] = 1;
    }
  }

  console.log(mediaTypes);
  return mediaTypes;
}

// EXTRA 2, task 20

function numberOfTracksComposedBySomeone(albums, name) {
  let numberOfTracks = 0;

  for (const album of albums) {
    for (const track of album.details) {
      if (track.composer && track.composer.includes(name)) {
        numberOfTracks++;
      }
    }
  }

  console.log(numberOfTracks);
  return numberOfTracks;
}
