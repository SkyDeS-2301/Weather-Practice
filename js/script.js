import { API, APIKEY, URL_ICONS, fetchingData } from "./utility.js";

// Search panel elements
const inputSearch = document.querySelector( '.search__input' );
const buttonSearch = document.querySelector( '.search__button' );

// Main info city elements
const mainCountryName = document.querySelector( '.main-info__country' );
const mainCountryDegrees = document.querySelector( '.main-info__degree' );
const mainCountryIcon = document.querySelector( '.main-info__icon' );

// Secondary info city elements
const secondaryCountryName = document.querySelector( '.secondary-info__country' );
const secondaryCountryDegrees = document.querySelector( '.secondary-info__degree' );
const secondaryCountryHumidity = document.querySelector( '.secondary-info__humidity' );
const secondaryCountryWind = document.querySelector( '.secondary-info__wind' );

// Start main logic
inputSearch.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    getWeatherData()
  }
})
buttonSearch.addEventListener( 'click', getWeatherData );

async function getWeatherData() {
  const countryName = inputSearch.value.toLowerCase() || 'GERMANY';

  const path = `${ API }${ countryName }`;
  inputSearch.value = '';
  const data = await fetchingData( path );
  if ( !data ) return
  console.log( data )
  mainCountryName.textContent = data.name;
  mainCountryDegrees.textContent = Math.floor( data.main.temp - 273 ) + '°';
  mainCountryIcon.src = `${ URL_ICONS }${ data.weather[ 0 ].icon }@2x.png`;

  secondaryCountryName.textContent = data.name;
  secondaryCountryDegrees.textContent = Math.floor( data.main.temp - 273 ) + '°';
  secondaryCountryHumidity.textContent = data.main.humidity;
  secondaryCountryWind.textContent = data.wind.speed + 'm/s';
}