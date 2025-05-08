document.addEventListener('DOMContentLoaded', function() {
    const countryInput = document.getElementById('countryInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const defaultCountriesContainer = document.getElementById('defaultCountries');


       
        const defaultCountries = ['USA', 'Canada', 'Japan', 'Brazil', 'Germany', 'Australia'];
    
       
        loadDefaultCountries();
        
      
        searchBtn.addEventListener('click', searchCountry);
        
       
        countryInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCountry();
            }
        });
    
        function loadDefaultCountries() {
            defaultCountries.forEach(country => {
                fetchCountryData(country, true);
            });
        }
    
        function searchCountry() {
            const countryName = countryInput.value.trim();
            
            if (!countryName) {
                alert('Please enter a country name');
                return;
            }
            
           
            resultsContainer.innerHTML = `
                <div class="default-message">
                    <h2>Search Results</h2>
                    <p>Showing results for: ${countryName}</p>
                </div>
            `;
            
            const searchResultsDiv = document.createElement('div');
            resultsContainer.appendChild(searchResultsDiv);
            
            fetchCountryData(countryName, false);
        }
    

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

    function displayCountryData(countries, isDefault) {
        const container = isDefault ? defaultCountriesContainer : resultsContainer;
        
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
            
           
            let currencies = 'N/A';
            if (country.currencies) {
                currencies = Object.values(country.currencies)
                    .map(currency => `${currency.name} (${currency.symbol || 'No symbol'})`)
                    .join(', ');
            }
            
           
            let languages = 'N/A';
            if (country.languages) {
                languages = Object.values(country.languages).join(', ');
            }
            
            countryCard.innerHTML = `
                <div class="country-header">
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="country-flag">
                    <h2 class="country-name">${country.name.common}</h2>
                </div>
                
                <div class="country-details">
                    <div class="detail-item">
                        <span class="detail-label">Official Name:</span>
                        <span>${country.name.official}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Capital:</span>
                        <span>${country.capital ? country.capital.join(', ') : 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Region:</span>
                        <span>${country.region}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Subregion:</span>
                        <span>${country.subregion || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Population:</span>
                        <span>${country.population.toLocaleString()}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Currency:</span>
                        <span>${currencies}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Languages:</span>
                        <span>${languages}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Timezones:</span>
                        <span>${country.timezones.join(', ')}</span>
                    </div>
                </div>
            `;

            
