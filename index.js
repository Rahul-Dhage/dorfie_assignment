function fetchData(link) {
  return fetch(link)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

let countriesData = [];
let statesData, citiesData;

const countryDropdown = document.getElementById("country");
countryDropdown.innerHTML = '<option value="">Loading...</option>';

// Fetch countries data
fetchData("https://d32sbion19muhj.cloudfront.net/pub/interview/countries").then(
  (data) => {
    countriesData = data.data; // Assuming data is an array within the response
    countryDropdown.innerHTML = '<option value="">Select Country</option>';
    countriesData.forEach((country) => {
      countryDropdown.innerHTML += `<option value="${country.id}">${country.name}</option>`;
    });
  }
);

//  fetch states based on the selected country
function fetchStates() {
  const stateDropdown = document.getElementById("state");
  stateDropdown.innerHTML = '<option value="">Loading...</option>'; // Show loading message

  const selectedCountryId = document.getElementById("country").value;

  // states for the selected country
  if (selectedCountryId) {
    stateDropdown.innerHTML = '<option value="">Select State</option>';
    statesData.forEach((state) => {
      if (state.country_id === parseInt(selectedCountryId)) {
        stateDropdown.innerHTML += `<option value="${state.id}">${state.name}</option>`;
      }
    });
  } else {
    stateDropdown.innerHTML = '<option value="">No states found</option>';
  }
}

// fetching cities based on the selected state
function fetchCities() {
  const cityDropdown = document.getElementById("city");
  cityDropdown.innerHTML = '<option value="">Loading...</option>'; 

  const selectedStateId = document.getElementById("state").value;

  // Finding the cities for the selected state
  if (selectedStateId) {
    cityDropdown.innerHTML = '<option value="">Select City</option>';
    citiesData.forEach((city) => {
      if (city.state_id === parseInt(selectedStateId)) {
        cityDropdown.innerHTML += `<option value="${city.id}">${city.name}</option>`;
      }
    });
  } else {
    cityDropdown.innerHTML = '<option value="">No cities found</option>';
  }
}

fetchData("https://d32sbion19muhj.cloudfront.net/pub/interview/states").then(
  (data) => {
    statesData = data.data;
  }
);

fetchData("https://d32sbion19muhj.cloudfront.net/pub/interview/cities").then(
  (data) => {
    citiesData = data.data;
  }
);

// Handling the form data
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("form");
  const formData = new FormData(form);
  const data = {};

  const selectedCountry = document.getElementById("country").value;
  const selectedState = document.getElementById("state").value;
  const selectedCity = document.getElementById("city").value;



  data["country"] = "id";
  data["selectedCountry"] = selectedCountry;
  data["selectedState"] = selectedState;
  data["selectedCity"] = selectedCity;

  const dataString = JSON.stringify(data, null, 2);
  const notify = document.createElement("div");
  notify.className = "notify";
  notify.innerHTML = ` <div class="notify-content">
      <span class="close-notify" onclick="closeNotify()">&times;</span>
      <pre>${dataString}</pre>
    </div>
  `;
  document.body.appendChild(notify);
  window.closeNotify = function () {
    document.body.removeChild(notify);
  };
}

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
