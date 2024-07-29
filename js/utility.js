const APIKEY = 'e3f537b5e2b625ebb637be76ee239cad';
const API = `https://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}&q=`;
const URL_ICONS = `https://openweathermap.org/img/wn/`

async function fetchingData( url, options ) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw Error(`Problem with Fetch, message error - ${response.statusText}`);
    }
    return await response.json();

  } catch ( error ) {
    console.log(error);
  }
}
export {API, APIKEY, URL_ICONS, fetchingData };