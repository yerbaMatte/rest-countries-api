'use strict';

const navBar = document.querySelector('.navbar');
const selectRegion = document.querySelector('select[name="regions"]');
const searchInput = document.querySelector('#search');
const flagsBox = document.querySelector('.flags-box');
const dFlag = document.querySelector('.d-flag');
const modeButton = document.querySelector('.btn-secondary');
const flagsContainer = document.querySelector('section');
const popUp = document.querySelector('.country-container.cont-fired');

const getData = fetch('https://restcountries.com/v3.1/all').then((x) =>
  x.json()
);

const countryHTML = (country) => `<div class='d-flag' >
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
  if (this.value) {
    createAllCountries(
      dane.filter((x) =>
        x.name.common.startsWith(
          this.value[0].toUpperCase() + this.value.slice(1, -1)
        )
      )
    );
  } else {
    createAllCountries(getData);
  }
});

// DARK/LIGHT MODE
modeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// STICKY NAVBAR
window.onscroll = () => {
  if (
    window.pageYOffset >=
    searchInput.parentElement.parentElement.offsetTop +
      searchInput.parentElement.parentElement.offsetHeight
  ) {
    // flagsContainer.classList.add('fixed-pos');
    flagsContainer.style.marginTop = `${navBar.offsetHeight}px`;
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
    flagsContainer.style.marginTop = `0`;
  }
};

// GET MORE INFO ABOUT COUNTRY by clicking
flagsBox.addEventListener('click', async function (e) {
  const getBorders = function (country) {
    if (country.borders) {
    }
    return 'None';
  };

  const detailsHTML = (country) =>
    `<div class="container h-100 d-flex align-items-center justify-content-center d-flex">
    <div class="d-flex align-items-center justify-content-center>
  <div class="flag-container p-4"><img class='flag-svg' src='${
    country.flags.svg
  }' alt='' /></div> <div class="content-container p-4"> <p class="country-name">${
      country.name.common
    }</p> <p class="country-population"> <span>Population: </span>${country.population.toLocaleString(
      'en-US'
    )}</p> <p class="country-region"><span>Region: </span>${
      country.region
    }</p> <p class="country-region"><span>Sub Region: </span>${
      country.subregion
    }</p> <p class="country-region"><span>Capital: </span>${
      country.capital
    }</p> <p class="country-region"><span>Currencies: </span>${Object.keys(
      country.currencies
    )}</p> <p class="country-region"><span>Languages: </span>${Object.values(
      country.languages
    )}</p> <p class="country-region"> <span>Border Countries: </span>${getBorders(
      country
    )}</p> </div></div> </div> `;

  let dane = await getData;
  const getCountry = e.target.closest('.d-flag');
  const getCountryName = getCountry?.children[1].children[0].innerText;
  const findCountryObj = dane.find(
    (country) => country.name.common === getCountryName
  );
  if (findCountryObj) {
    flagsBox.nextElementSibling.innerHTML = detailsHTML(findCountryObj);
    flagsBox.nextElementSibling.classList.remove('hidden');
    const countryContainer = document.querySelector('.country-container');

    if (navBar.classList.contains('sticky')) {
      countryContainer.style.transform = `translateY(${
        window.scrollY - navBar.offsetHeight
      }px)`;
    } else {
      countryContainer.style.transform = `translateY(${window.pageYOffset}px)`;
    }

    // PREVENT SCROLIING
    document.body.style.overflow = 'hidden';
  }
});

document.querySelector('.cont-fired').addEventListener('click', () => {
  document.body.style.overflow = 'auto';
  flagsBox.nextElementSibling.classList.add('hidden');
});
