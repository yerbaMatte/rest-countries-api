'use strict';

const flagsBox = document.querySelector('.flags-box');
const dFlag = document.querySelector('.d-flag');

const getData = fetch('https://restcountries.com/v3.1/all')
  .then((x) => x.json())
  .then((x) => x);

async function createCountry() {
  const jsonData = await getData;
  // GB DATA
  const htmlFlag = `<div class='d-flag'>
  <div class="box-svg"><img class='flag-svg' src='${
    jsonData[27].flags.svg
  }' alt='' /></div>
  <div class='country-content'>
    <p class='country-name'>${jsonData[27].altSpellings[2]}</p>
    <p class='country-population'>
      <span>Population: </span>${jsonData[27].population.toLocaleString(
        'en-US'
      )}
    </p>
    <p class='country-region'>
      <span>Region: </span>${jsonData[27].region}
    </p>
    <p class='country-capital'>
      <span>Capital: </span>${jsonData[27].capital}
    </p>
  </div>
</div>`;

  flagsBox.insertAdjacentHTML('afterbegin', htmlFlag);
  console.log(jsonData[27]);
}

createCountry();
