const countriesContainer = document.querySelector(".countries-container");

let countries = [];
let sortMethod = "alpha";

const fetchCountries = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
  console.log(countries);
  countriesDisplay();
};

function countriesDisplay() {
  countriesContainer.innerHTML = countries
    // 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    // 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
      <div class="card">
      <div class="flag"><img src="${country.flags.png}" alt="${
          country.flags.alt
        }"></div>
      <h2>${country.translations.fra.common}</h2>
      <h3>${country.capital}</h3>
      <p>Population : ${country.population.toLocaleString()}</p>
      </div>
      `
    )
    .join("");
}

window.addEventListener("load", fetchCountries);
inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", () => {
  rangeValue.textContent = inputRange.value;
  countriesDisplay();
});
minToMax.addEventListener("click", () => {
  sortMethod = "minToMax";
  countriesDisplay();
});
maxToMin.addEventListener("click", () => {
  sortMethod = "maxToMin";
  countriesDisplay();
});
alpha.addEventListener("click", () => {
  sortMethod = "alpha";
  countriesDisplay();
});

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
