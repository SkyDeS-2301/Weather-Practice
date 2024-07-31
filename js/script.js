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

// Start

// Tabs logic
const tabsContent = document.querySelectorAll( '.content' );
const tabsButtons = document.querySelectorAll( '.switch-pages__btn' );
tabsButtons.forEach( button => button.addEventListener( 'click', showTab ) );

function showTab( e ) {
  const t = e.target;
  tabsButtons.forEach( ( button, index ) => {
    if ( button === t ) {
      hideTabs()
      t.classList.add( 'switch-pages__btn--active' );
      tabsContent[ index ].classList.remove( 'none' )
    }
  } )
}

function hideTabs() {
  tabsButtons.forEach( button => button.classList.remove( 'switch-pages__btn--active' ) );
  tabsContent.forEach( tab => tab.classList.add( 'none' ) );
}

// Add location to history logic
const countryHistoryPanel = document.querySelector( '.country-history' );
const locationHistoryArray = [];
showHistoryLocation()

function showHistoryLocation() {
  const locationElements = locationHistoryArray.map( loc => {
    return `<div class="country"><span class="country__name">${ loc }</span>
              <button class="country__delete">Del</button>
            </div>`
  } )

  countryHistoryPanel.innerHTML = locationElements.join( '' );
}

const addLocationButton = document.querySelector( '.add-country-btn' );
addLocationButton.addEventListener( 'click', addLocationToHistory );

function addLocationToHistory() {
  const locationValue = mainCountryName.textContent;
  if ( locationValue === 'Location' ) return
  debugger
  if (!locationHistoryArray.includes(locationValue)) {
    locationHistoryArray.push( locationValue );
    showHistoryLocation();
  }
}

// Work with API
inputSearch.addEventListener( 'keydown', ( e ) => {
  if ( e.keyCode === 13 ) {
    getWeatherData()
  }
} )
buttonSearch.addEventListener( 'click', getWeatherData );

async function getWeatherData() {
  const countryName = inputSearch.value.toLowerCase() || 'Italia';

  const path = `${ API }${ countryName }`;
  inputSearch.value = '';
  const data = await fetchingData( path );
  if ( !data ) return
  console.log( data )
  mainCountryName.textContent = data.name;
  mainCountryDegrees.textContent = `${ Math.floor( data.main.temp - 273 ) }°`;
  mainCountryIcon.src = `${ URL_ICONS }${ data.weather[ 0 ].icon }@2x.png`;

  secondaryCountryName.textContent = `Location --- ${ data.name }`;
  secondaryCountryDegrees.textContent = `Degrees --- ${ Math.floor( data.main.temp - 273 ) }°`;
  secondaryCountryHumidity.textContent = `Humidity --- ${ data.main.humidity } %`;
  secondaryCountryWind.textContent = `Wind speed --- ${ data.wind.speed } m/s`;
}