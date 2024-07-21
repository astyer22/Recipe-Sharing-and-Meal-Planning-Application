// Event listener that triggers when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    const recipeId = getRecipeIdFromURL(); // Get recipe ID from the URL
    if (recipeId) {
        const recipeDetails = await fetchRecipeDetails(recipeId); // Fetch recipe details using the recipe ID
        displayRecipeDetails(recipeDetails); // Display the fetched recipe details
    } else {
        console.error('Recipe ID not found in URL'); // Log an error if the recipe ID is not found in the URL
    }

    // Get references to the buttons and select elements
    const saveRecipeBtn = document.getElementById('saveRecipeBtn');
    const downloadPlanBtn = document.getElementById('downloadPlanBtn');
    const dayOfWeekSelect = document.getElementById('dayOfWeekSelect');
    const mealTypeSelect = document.getElementById('mealTypeSelect');

    // Event listener for save recipe button click
    saveRecipeBtn.addEventListener('click', () => {
        const recipeId = getRecipeIdFromURL(); // Get recipe ID from the URL
        const dayOfWeek = dayOfWeekSelect.value; // Get selected day of the week
        const mealType = mealTypeSelect.value; // Get selected meal type

        saveRecipeToLocalStorage(recipeId, dayOfWeek, mealType); // Save recipe to local storage
        alert('Recipe saved successfully!'); // Alert user of successful save
    });

    // Event listener for download plan button click
    downloadPlanBtn.addEventListener('click', () => {
        downloadWeeklyMealPlan(); // Download the weekly meal plan as a PDF
    });
});

// Function to fetch detailed recipe information based on recipe ID
async function fetchRecipeDetails(recipeId) {
    const apiKey = '6831f14e4ce94c6caabbdcb3ba352ea9'; // Spoonacular API key
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`; // API URL for fetching recipe details

    try {
        const response = await fetch(apiUrl); // Fetch recipe details from the API
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Throw error if response is not ok
        }
        const data = await response.json(); // Parse JSON data from the response
        return data; // Return detailed recipe information
    } catch (error) {
        console.error('Error fetching recipe details:', error); // Log error to the console
        return null; // Return null in case of error
    }
}

// Function to display detailed recipe information in the UI
function displayRecipeDetails(recipeDetails) {
    const recipeDetailsContainer = document.getElementById('recipeDetails'); // Get the element to display recipe details
    if (recipeDetails) {
        // Extract nutritional information from the recipe details
        const calories = recipeDetails.nutrition.nutrients.find(nutrient => nutrient.title === 'Calories');
        const protein = recipeDetails.nutrition.nutrients.find(nutrient => nutrient.title === 'Protein');
        const fat = recipeDetails.nutrition.nutrients.find(nutrient => nutrient.title === 'Fat');
        const carbohydrates = recipeDetails.nutrition.nutrients.find(nutrient => nutrient.title === 'Carbohydrates');

        // Set the inner HTML with the recipe details
        recipeDetailsContainer.innerHTML = `
            <h2>${recipeDetails.title}</h2>
            <img src="${recipeDetails.image}" alt="${recipeDetails.title}">
            <p>Ready in ${recipeDetails.readyInMinutes} minutes</p>
            <h3>Ingredients</h3>
            <ul>
                ${recipeDetails.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
            </ul>
            <h3>Instructions</h3>
            <p>${recipeDetails.instructions}</p>`;
    } else {
        recipeDetailsContainer.innerHTML = '<p>Error fetching recipe details.</p>'; // Display error message if recipe details are not available
    }
}

// Function to get the recipe ID from the URL
function getRecipeIdFromURL() {
    const queryString = window.location.search; // Get the query string from the URL
    const urlParams = new URLSearchParams(queryString); // Parse the query string
    return urlParams.get('recipeId'); // Return the value of the 'recipeId' parameter
}

// Function to save a recipe to local storage
function saveRecipeToLocalStorage(recipeId, dayOfWeek, mealType) {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || {}; // Get saved recipes from local storage or initialize an empty object
    if (!savedRecipes[dayOfWeek]) {
        savedRecipes[dayOfWeek] = {}; // Initialize an empty object for the day if it doesn't exist
    }
    savedRecipes[dayOfWeek][mealType] = recipeId; // Save the recipe ID under the specified day and meal type
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes)); // Save the updated recipes object to local storage
}

// Function to download the weekly meal plan as a PDF
async function downloadWeeklyMealPlan() {
    const { jsPDF } = window.jspdf; // Get the jsPDF library
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || {}; // Get saved recipes from local storage or initialize an empty object
    const daysOfWeek = Object.keys(savedRecipes); // Get the keys (days of the week) from the saved recipes object

    // Create a new PDF document
    const doc = new jsPDF();
    let yPos = 10; // Initial Y position for the text in the PDF

    // Loop through each day of the week
    for (const dayOfWeek of daysOfWeek) {
        doc.text(dayOfWeek, 10, yPos); // Add the day of the week to the PDF
        yPos += 10; // Increment Y position

        const meals = savedRecipes[dayOfWeek]; // Get the meals for the current day
        for (const mealType of Object.keys(meals)) {
            const recipeId = meals[mealType]; // Get the recipe ID for the current meal type
            if (recipeId) {
                const recipeDetails = await fetchRecipeDetails(recipeId); // Fetch the recipe details
                if (recipeDetails) {
                    doc.text(`${mealType}: ${recipeDetails.title}`, 20, yPos); // Add the meal type and recipe title to the PDF
                    yPos += 7; // Increment Y position
                } else {
                    doc.text(`${mealType}: Recipe details not found`, 20, yPos); // Add a message if recipe details are not found
                    yPos += 7; // Increment Y position
                }
            }
        }

        yPos += 10; // Add some space between days
    }

    doc.save('weekly_meal_plan.pdf'); // Save the PDF with the specified filename
}
