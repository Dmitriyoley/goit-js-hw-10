import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce'
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
    const inputCountry = inputEl.value.trim();
    if (!inputCountry) {
        listEl.innerHTML = '';
        infoEl.innerHTML = '';
        return;
    }
    
  fetchCountries(inputCountry)
    .then(createListItem)
    .catch(error =>
      Notiflix.Notify.failure("Oops, there is no country with that name")
    );
}
function createListItem(countries) {
    if (countries.length === 1) {
      const createCountryItem = countries
        .map(({ name, capital, population, flags, languages }) => {
          return `
          <h1 class="title-country"> 
            <img src = ${flags.svg} 
                alt = "flag of country" 
                width = 500>
                <br>
                <span class= "title-text">${name.official}</span>
            </h1>
        <p class ="text"><b>Capital</b>: ${capital}</p>
        <p class ="text"><b>Population</b>: ${population}</p>
        <p class ="text"><b>Languages</b>: ${Object.values(languages).join(
          ', '
        )}</p> `;
        })
        .join('');

      listEl.innerHTML = '';
      infoEl.innerHTML = createCountryItem;
     }
    if (countries.length > 10) {
        listEl.innerHTML = '';
        infoEl.innerHTML = '';
      
      Notiflix.Notify.info(
        "Too many matches found. Please enter a more specific name."
      );
    }
    if (countries.length >= 2 && countries.length < 10) {
        const createCountryList = countries
            .map(({ name, flags }) => {
                return `
          <li> 
            <img src = ${flags.svg} 
                alt = "Country flag" 
                width = 100>
            <span>${name.official}</span>
          </li>`;
            })
            .join('');
        listEl.innerHTML = createCountryList;
        infoEl.innerHTML = '';
    }
}