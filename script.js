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