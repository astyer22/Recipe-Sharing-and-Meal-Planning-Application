// Event listener that triggers when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Recipe Search Page Loaded');

    const recipeSearchForm = document.getElementById('recipeSearchForm'); // Get reference to the recipe search form
    const recipeResults = document.getElementById('recipeResults'); // Get reference to the recipe results container
    const maxResultsPerPage = 10; // Number of recipes to display per page
    let currentPage = 1; // Initialize current page to 1
    let currentQuery = []; // Initialize current query as an empty array

    // Event listener for form submission
    recipeSearchForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        currentQuery = getSearchQueries(); // Get search queries from the input fields
        if (currentQuery.length > 0) {
            currentPage = 1; // Reset to first page when performing new search
            const recipes = await fetchRecipes(currentQuery, currentPage); // Fetch recipes based on the search query and current page
            displayRecipes(recipes); // Display the fetched recipes
        } else {
            alert('Please enter at least one food item.'); // Alert user if no search queries are entered
        }
    });

    // Function to fetch recipes from the API
    async function fetchRecipes(query, page) {
        const apiKey = '6831f14e4ce94c6caabbdcb3ba352ea9'; // Spoonacular API key
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query.join(',')}&apiKey=${apiKey}&number=${maxResultsPerPage}&offset=${(page - 1) * maxResultsPerPage}`; // API URL for fetching recipes

        try {
            const response = await fetch(apiUrl); // Fetch recipes from the API
            if (!response.ok) {
                throw new Error('Network response was not ok'); // Throw error if response is not ok
            }
            const data = await response.json(); // Parse JSON data from the response
            return data.results; // Assuming results contain recipe data
        } catch (error) {
            console.error('Error fetching recipes:', error); // Log error to the console
            return []; // Return empty array on error
        }
    }

    // Function to display fetched recipes in the UI
    function displayRecipes(recipes) {
        recipeResults.innerHTML = ''; // Clear previous results
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div'); // Create a new div element for each recipe
            recipeCard.classList.add('recipe-card'); // Add 'recipe-card' class to the div
            
            // Construct the recipe details
            let readyInMinutesText = recipe.readyInMinutes !== undefined ? `Ready in ${recipe.readyInMinutes} minutes` : '';
            
            recipeCard.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p>${readyInMinutesText}</p> <!-- Display readyInMinutes only if defined -->
                <button onclick="viewRecipeDetails(${recipe.id})">View Details</button>
            `; // Set inner HTML with recipe details
            
            recipeResults.appendChild(recipeCard); // Append the recipe card to the results container
        });
        addPaginationControls(); // Add pagination controls
    }

    // Function to add pagination controls
    function addPaginationControls() {
        const paginationDiv = document.createElement('div'); // Create a new div element for pagination
        paginationDiv.classList.add('pagination'); // Add 'pagination' class to the div

        // Create and configure the previous page button
        const prevPageBtn = document.createElement('button');
        prevPageBtn.textContent = 'Previous';
        prevPageBtn.disabled = currentPage === 1; // Disable the button if the current page is the first page
        prevPageBtn.addEventListener('click', async () => {
            if (currentPage > 1) {
                currentPage--;
                const recipes = await fetchRecipes(currentQuery, currentPage); // Fetch recipes for the previous page
                displayRecipes(recipes); // Display the fetched recipes
            }
        });

        // Create and configure the next page button
        const nextPageBtn = document.createElement('button');
        nextPageBtn.textContent = 'Next';
        nextPageBtn.addEventListener('click', async () => {
            currentPage++;
            const recipes = await fetchRecipes(currentQuery, currentPage); // Fetch recipes for the next page
            displayRecipes(recipes); // Display the fetched recipes
        });

        // Create and configure the page info span
        const pageInfoSpan = document.createElement('span');
        pageInfoSpan.textContent = `Page ${currentPage}`; // Display the current page number

        // Append the pagination controls to the pagination div
        paginationDiv.appendChild(prevPageBtn);
        paginationDiv.appendChild(pageInfoSpan);
        paginationDiv.appendChild(nextPageBtn);

        // Append the pagination div to the results container
        recipeResults.appendChild(paginationDiv);
    }

    // Function to view recipe details
    window.viewRecipeDetails = function(recipeId) {
        window.location.href = `recipe-details.html?recipeId=${recipeId}`; // Redirect to the recipe details page with the recipe ID in the URL
    };

    // Function to get search queries from input fields
    function getSearchQueries() {
        const queries = [];
        for (let i = 1; i <= 5; i++) {
            const input = document.getElementById(`searchInput${i}`).value.trim(); // Get the trimmed value from each input field
            if (input) {
                queries.push(input); // Add the input value to the queries array if it's not empty
            }
        }
        return queries; // Return the array of search queries
    }
});
