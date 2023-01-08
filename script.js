'use strict';

const selectRegion = document.querySelector('select[name="regions"]');
const searchInput = document.querySelector('#search');
const flagsBox = document.querySelector('.flags-box');
const dFlag = document.querySelector('.d-flag');

const getData = fetch('https://restcountries.com/v3.1/all').then((x) =>
  x.json()
);

const countryHTML = (country) => `<div class='d-flag'>
  <div class="box-svg"><img class='flag-svg' src='${
    country.flags.svg
  }' alt='' /></div>
  <div class='country-content'>
    <p class='country-name'>${country.name.common}</p>
    <div class="country-desc">
    <p class='country-population'>
      <span>Population: </span>${country.population.toLocaleString('en-US')}
    </p>
    <p class='country-region'>
      <span>Region: </span>${country.region}
    </p>
    <p class='country-capital'>
      <span>Capital: </span>${country.capital}
    </p></div>
  </div>
  </div>`;

async function createAllCountries(getData) {
  for (let country of await getData) {
    flagsBox.insertAdjacentHTML('afterbegin', countryHTML(country));
  }
}

createAllCountries(getData);

// FILTERING METHOD
selectRegion.addEventListener('change', async function () {
  // Why do I need await keyword again here?
  let dane = await getData;
  flagsBox.innerHTML = '';

  // Filter - Africa Americas Antarctic Asia Europe Oceania
  dane = dane.filter((x) => x.region === this.value);
  createAllCountries(dane);
});

// SEARCH FOR COUNTRIES
searchInput.addEventListener('input', async function (e) {
  let dane = await getData;
  flagsBox.innerHTML = '';
  createAllCountries(dane.filter((x) => x.name.common.startsWith(this.value)));
});
