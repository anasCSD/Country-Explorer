document.addEventListener('DOMContentLoaded', function() {
    const countryInput = document.getElementById('countryInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const defaultCountriesContainer = document.getElementById('defaultCountries');


    function fetchCountryData(countryName, isDefault) {
        const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Country not found');
                }
                return response.json();
            })
            .then(data => {
                displayCountryData(data, isDefault);
            })
            .catch(error => {
                if (!isDefault) {
                    const errorDiv = document.createElement('div');
                    errorDiv.innerHTML = `<p class="error-message">${error.message}. Please try another country name.</p>`;
                    resultsContainer.appendChild(errorDiv);
                }
                console.error('Error:', error);
            });
    }