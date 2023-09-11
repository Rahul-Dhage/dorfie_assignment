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

// Populate the initial list of countries
const countryDropdown = document.getElementById("country");
countryDropdown.innerHTML = '<option value="">Loading...</option>'; // Show loading message

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

// Function to fetch states based on the selected country
function fetchStates() {
  const stateDropdown = document.getElementById("state");
  stateDropdown.innerHTML = '<option value="">Loading...</option>'; // Show loading message

  // Get the selected country value
  const selectedCountryId = document.getElementById("country").value;

  // Find the states for the selected country
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

// Function to fetch cities based on the selected state
function fetchCities() {
  const cityDropdown = document.getElementById("city");
  cityDropdown.innerHTML = '<option value="">Loading...</option>'; // Show loading message

  // Get the selected state value
  const selectedStateId = document.getElementById("state").value;

  // Find the cities for the selected state
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

// Fetch states and cities data (replace with your actual data retrieval logic)
fetchData("https://d32sbion19muhj.cloudfront.net/pub/interview/states").then(
  (data) => {
    statesData = data.data; // Assuming data is an array within the response
  }
);

fetchData("https://d32sbion19muhj.cloudfront.net/pub/interview/cities").then(
  (data) => {
    citiesData = data.data; //  data is an array within the response
  }
);
