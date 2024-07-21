The web application developed is a Recipe Saving and Meal Planning tool. Users can enter a food item, and a list of relevant food options will be displayed. Once an item is selected, users can save it to their desired day of the week. Additionally, users can save their meal plan as a PDF to their local system.

To start the application, run "npm run start" in the local terminal, and the application will open in the user's default web browser.

The Reciepe Saver and Meal Planner was designed to help individuals decide what meals to prepare with the ingredients they have at home. Additionally, it offers a convenient way to generate personalized meal plans.

{Provide a link to your YouTube demonstration.  It should be a 4-5 minute demo of the software running (starting the server and navigating through the web pages) and a walkthrough of the code.}

[Software Demo Video](http://youtube.link.goes.here)

# Web Pages

### Description of Web Pages and Transitions

1. **Home Page (index.html)**
   - **Purpose:**
     - The landing page of the application.
   - **Content:**
     - Introduction to the app and its features.
     - Navigation bar linking to other pages.
   - **Dynamic Elements:**
     - None.
   - **Transition:**
     - Users can navigate to the login, registration, recipe search, and meal plan pages via the navigation bar.

2. **Login Page (login.html)**
   - **Purpose:**
     - Allows users to log into their accounts.
   - **Content:**
     - Form fields for email and password.
     - Button to submit the login form.
   - **Dynamic Elements:**
     - Error messages displayed if login fails.
   - **Transition:**
     - Upon successful login, users are redirected to the Recipe Search page or the Meal Plan page, depending on their previous interaction.

3. **Registration Page (register.html)**
   - **Purpose:**
     - Allows new users to create an account.
   - **Content:**
     - Form fields for email, password, and confirmation password.
     - Button to submit the registration form.
   - **Dynamic Elements:**
     - Error messages displayed if registration fails.
   - **Transition:**
     - Upon successful registration, users are redirected to the login page.

4. **Recipe Search Page (recipe-search.html)**
   - **Purpose:**
     - Enables users to search for recipes using the Spoonacular API.
   - **Content:**
     - Five input fields for entering food items.
     - Search button to initiate the search.
     - Area to display search results with recipe names and images.
   - **Dynamic Elements:**
     - Search results displayed dynamically based on user input.
     - Pagination for navigating through multiple pages of search results.
   - **Transition:**
     - Clicking on a recipe redirects the user to the Recipe Details page.

5. **Recipe Details Page (recipe-details.html)**
   - **Purpose:**
     - Displays detailed information about a selected recipe.
   - **Content:**
     - Recipe title, image, ingredients, instructions, and nutritional information.
     - Buttons to save the recipe to a specific day of the week.
   - **Dynamic Elements:**
     - Recipe details dynamically fetched from the Spoonacular API.
     - User interactions for saving recipes.
   - **Transition:**
     - Users can navigate back to the Recipe Search page or access the Meal Plan page via the navigation bar.

6. **Meal Plan Page (meal-plan.html)**
   - **Purpose:**
     - Allows users to view and manage their weekly meal plan.
   - **Content:**
     - Sections for each day of the week with slots for breakfast, lunch, and dinner.
     - Button to download the meal plan as a PDF.
   - **Dynamic Elements:**
     - Meal plan data dynamically fetched from local storage or Firestore.
     - Recipes displayed dynamically based on user selections.
     - PDF generation for downloading the meal plan.
   - **Transition:**
     - Users can navigate to the Recipe Search page to add more recipes to their meal plan.

### Dynamic Elements and Transitions

1. **Search Functionality:**
   - **Recipe Search Page:**
     - Users can enter up to five food items and search for recipes.
     - Search results are dynamically displayed with pagination for multiple pages of results.
     - Clicking on a recipe redirects to the Recipe Details page.

2. **Recipe Details and Saving:**
   - **Recipe Details Page:**
     - Displays detailed information about the selected recipe.
     - Users can save recipes to specific days of the week.
     - Data is stored in local storage or Firestore for retrieval on the Meal Plan page.

3. **Meal Plan Management:**
   - **Meal Plan Page:**
     - Displays saved recipes for each day of the week.
     - Users can download their meal plan as a PDF.
     - Meal plan data is fetched dynamically from local storage or Firestore.

### Example Code Snippets

1. **Navigation Bar (common to all pages):**
   ```html
   <nav>
     <ul>
       <li><a href="index.html">Home</a></li>
       <li><a href="login.html">Login</a></li>
       <li><a href="register.html">Register</a></li>
       <li><a href="recipe-search.html">Search Recipes</a></li>
       <li><a href="meal-plan.html">Meal Plan</a></li>
     </ul>
   </nav>
   ```

2. **Recipe Search Form:**
   ```html
   <form id="recipeSearchForm">
     <label for="searchInput1">Food Item #1:</label>
     <input type="text" id="searchInput1" placeholder="Enter first food item">
     <label for="searchInput2">Food Item #2:</label>
     <input type="text" id="searchInput2" placeholder="Enter second food item">
     <label for="searchInput3">Food Item #3:</label>
     <input type="text" id="searchInput3" placeholder="Enter third food item">
     <label for="searchInput4">Food Item #4:</label>
     <input type="text" id="searchInput4" placeholder="Enter fourth food item">
     <label for="searchInput5">Food Item #5:</label>
     <input type="text" id="searchInput5" placeholder="Enter fifth food item">
     <button type="submit">Search</button>
   </form>
   ```

3. **Meal Plan Display:**
   ```html
   <div id="mealPlan">
     <div id="monday" class="day">
       <h3>Monday</h3>
       <div class="meal" id="breakfast">Breakfast: <span></span></div>
       <div class="meal" id="lunch">Lunch: <span></span></div>
       <div class="meal" id="dinner">Dinner: <span></span></div>
     </div>
     <!-- Repeat for other days -->
     <button id="downloadMealPlanBtn">Download Meal Plan</button>
   </div>
   ```

By creating these web pages and ensuring smooth transitions and dynamic content generation, the application provides a user-friendly interface for recipe searching, detailed recipe viewing, and meal planning. Integrating user authentication ensures that sensitive data and functionalities are protected and accessible only to registered users.

# Development Environment

### Tools Used to Develop the Software

1. **Visual Studio Code**
   - **Purpose:**
     - Code editor for writing and editing HTML, CSS, JavaScript, and Node.js code.
   - **Features:**
     - Syntax highlighting, code completion, integrated terminal, and extensions for linting and version control.

2. **Firebase**
   - **Purpose:**
     - Backend-as-a-Service (BaaS) for user authentication and Firestore for database storage.
   - **Features:**
     - Simplified user authentication, real-time database, and secure access to data.

3. **Git**
   - **Purpose:**
     - Version control system for tracking changes and collaborating on code.
   - **Features:**
     - Branching, merging, and tracking the history of code changes.

4. **Node.js**
   - **Purpose:**
     - JavaScript runtime for building the backend server.
   - **Features:**
     - Asynchronous event-driven architecture, npm (Node Package Manager) for managing dependencies.

5. **Express.js**
   - **Purpose:**
     - Web framework for Node.js to build the backend API and handle HTTP requests.
   - **Features:**
     - Middleware for handling routes, requests, and responses.

6. **jsPDF**
   - **Purpose:**
     - JavaScript library for generating PDF documents.
   - **Features:**
     - Creating and downloading PDFs directly from the browser.

### Programming Languages and Libraries

1. **HTML**
   - **Purpose:**
     - Markup language for creating the structure and content of web pages.
   - **Usage:**
     - Building the skeleton of each web page, including forms, buttons, and sections.

2. **CSS**
   - **Purpose:**
     - Styling language for designing the visual presentation of web pages.
   - **Usage:**
     - Customizing the appearance of elements, ensuring responsive design, and enhancing user experience.

3. **JavaScript**
   - **Purpose:**
     - Scripting language for adding interactivity and dynamic behavior to web pages.
   - **Usage:**
     - Handling events, making API calls, manipulating the DOM, and managing data in local storage and Firestore.

4. **Node.js**
   - **Purpose:**
     - JavaScript runtime for building server-side applications.
   - **Usage:**
     - Creating a backend server to handle API requests, user authentication, and database interactions.

5. **Express.js**
   - **Purpose:**
     - Web framework for building robust APIs and handling server-side logic.
   - **Usage:**
     - Routing HTTP requests, handling middleware, and serving static files.

6. **Firebase Authentication**
   - **Purpose:**
     - Service for managing user authentication and authorization.
   - **Usage:**
     - Allowing users to register, log in, and access protected resources.

7. **Firestore (Firebase)**
   - **Purpose:**
     - NoSQL database for storing and syncing data in real-time.
   - **Usage:**
     - Storing user data, meal plans, and recipe information securely.

8. **jsPDF**
   - **Purpose:**
     - Library for generating PDF documents on the client side.
   - **Usage:**
     - Creating and downloading a PDF version of the weekly meal plan.

### Summary

The combination of these tools and libraries provides a robust stack for developing a full-featured recipe sharing and meal planning application. Visual Studio Code serves as the primary development environment, while Git ensures effective version control. Firebase simplifies backend operations, handling both user authentication and database storage. Node.js and Express.js form the backend server, managing API requests and interactions with Firebase. On the frontend, HTML and CSS construct the user interface, while JavaScript handles dynamic interactions and data manipulation. Finally, jsPDF facilitates the generation of downloadable meal plan PDFs, enhancing the user experience.

# Useful Websites

### List of Helpful Websites

1. **Mozilla Developer Network (MDN) Web Docs**
   - **URL:** [https://developer.mozilla.org](https://developer.mozilla.org)
   - **Purpose:**
     - Comprehensive documentation and tutorials on HTML, CSS, and JavaScript.
   - **Usage:**
     - Referenced for understanding and implementing web development best practices, syntax, and features.

2. **W3Schools**
   - **URL:** [https://www.w3schools.com](https://www.w3schools.com)
   - **Purpose:**
     - Tutorials and references on web development languages and frameworks.
   - **Usage:**
     - Used for quick examples and explanations of HTML, CSS, JavaScript, and Node.js concepts.

3. **Firebase Documentation**
   - **URL:** [https://firebase.google.com/docs](https://firebase.google.com/docs)
   - **Purpose:**
     - Official documentation for Firebase services, including authentication and Firestore.
   - **Usage:**
     - Essential for integrating Firebase authentication and Firestore database into the application.

# Future Work

* Implementing a feature that restricts meal plan access to registered and logged-in users.
* Designing a more user-friendly and visually appealing template for the meal plan.
