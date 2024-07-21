// Event listener that triggers when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Recipe Sharing and Meal Planning App Loaded'); // Log a message indicating the app has loaded
});

// Function to fetch recipes based on a search query
async function fetchRecipes(query) {
  const apiKey = '6831f14e4ce94c6caabbdcb3ba352ea9'; // Spoonacular API key
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`; // API URL with search query and API key

  try {
    const response = await fetch(apiUrl); // Fetch data from the API
    if (!response.ok) {
      throw new Error('Network response was not ok'); // Throw error if response is not ok
    }
    const data = await response.json(); // Parse JSON data from the response
    return data.results; // Return the recipe results
  } catch (error) {
    console.error('Error fetching recipes:', error); // Log error to the console
    return []; // Return an empty array in case of error
  }
}

// Event listener for form submission
const recipeSearchForm = document.getElementById('recipeSearchForm'); // Get the recipe search form element by its ID
recipeSearchForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const searchInput = document.getElementById('searchInput').value; // Get the value from the search input field
  const recipes = await fetchRecipes(searchInput); // Fetch recipes based on the search query
  displayRecipes(recipes); // Display the fetched recipes
});

// Function to display recipes in the UI
function displayRecipes(recipes) {
  const recipeResults = document.getElementById('recipeResults'); // Get the element to display recipe results
  recipeResults.innerHTML = ''; // Clear any previous results
  recipes.forEach(recipe => { // Loop through each recipe
    const recipeCard = document.createElement('div'); // Create a new div element for each recipe
    recipeCard.classList.add('recipe-card'); // Add a class to the recipe card for styling
    recipeCard.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p>Ready in ${recipe.readyInMinutes} minutes</p>
      <button onclick="viewRecipeDetails(${recipe.id})">View Details</button>
    `; // Set the inner HTML of the recipe card
    recipeResults.appendChild(recipeCard); // Append the recipe card to the results container
  });
}

// Function to view recipe details
async function viewRecipeDetails(recipeId) {
  const apiKey = '6831f14e4ce94c6caabbdcb3ba352ea9'; // Spoonacular API key
  const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`; // API URL for fetching recipe details

  try {
    const response = await fetch(recipeUrl); // Fetch recipe details from the API
    if (!response.ok) {
      throw new Error('Network response was not ok'); // Throw error if response is not ok
    }
    const recipeDetails = await response.json(); // Parse JSON data from the response
    displayRecipeDetails(recipeDetails); // Display the recipe details
  } catch (error) {
    console.error('Error fetching recipe details:', error); // Log error to the console
  }
}

// Function to display recipe details in a separate page or modal
function displayRecipeDetails(recipeDetails) {
  const recipeDetailsDiv = document.getElementById('recipeDetails'); // Get the element to display recipe details
  if (recipeDetailsDiv) {
    recipeDetailsDiv.innerHTML = `
      <h2>${recipeDetails.title}</h2>
      <img src="${recipeDetails.image}" alt="${recipeDetails.title}">
      <p>${recipeDetails.instructions}</p>
      <ul>
        ${recipeDetails.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
      </ul>
    `; // Set the inner HTML with the recipe details
  } else {
    console.error('Recipe details div not found'); // Log error if the recipe details div is not found
  }
}
